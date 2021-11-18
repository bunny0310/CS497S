const { Configuration } = require("./configuration");
const axios = require('axios').default;

const joinTableName = "UserVoteJoins";
const trendingPostsServiceHost = process.env.TRENDING_POSTS_SERVICE_URL || 'http://trending_posts_service:5000';

const listVoted = async (type, objectIds, pubKey) => {
    const con = await Configuration.generateConnection();
    const [rows, fields] = await con.query(`SELECT * FROM ${joinTableName} WHERE Type='${type}' AND ObjectId IN (${objectIds}) AND PublicKey='${pubKey}'`);
    const set = new Set(); 
    for (let i = 0; i < rows.length; ++i) {
        let row = rows[i];
        set.add(row.ObjectId);
    }
    await con.end();
    return Array.from(set);
}

const vote = async (id, pubKey, type, post) => {
    const shard = id % Configuration.numberOfShards;
    const con1 = Configuration.isProduction ? await Configuration.generateConnection(shard + 1) : await Configuration.generateConnection();
    try {
        await con1.beginTransaction();
        await con1.query(`UPDATE ${type} SET Votes = Votes + 1 WHERE id = ${id}`);
    } 
    catch (err) {
        await con1.rollback();
        throw new Error(`First query error, rolling back: ${err}`);
    }
    console.log("Moving on to the second query");
    const con2 = await Configuration.generateConnection();
    try {
        await con2.beginTransaction();
        const result = await con2.query(`INSERT INTO ${joinTableName} (ObjectId, Type, PublicKey) VALUES ('${id}', '${type}', '${pubKey}')`);
    } 
    catch (err) {
        await con1.rollback();
        await con2.rollback();
        throw new Error(`Second query error, rolling back: ${err}`);
    }
    try {
        await updateTrendingPosts(post);
    } 
    catch(err) {
        await con1.rollback();
        await con2.rollback();
        throw new Error(`Couldn't communicate with the trending posts service, rolling back: ${err}`);
    }
    try {
        await con1.commit();
        await con2.commit();
    } catch (err) {
        con1.rollback();
        con2.rollback();
        throw new Error(`Cannot commit the transactions: ${err}`);
    }
    await con1.end();
    await con2.end();
}

const updateTrendingPosts = async (post) => {
    const result = await axios.post(`${trendingPostsServiceHost}/updateTrendingPosts`, post);
    return result;
}
module.exports = {listVoted, vote}