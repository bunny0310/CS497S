const {Configuration} = require("./configuration");
const _ = require('lodash');
class Post {
    constructor(id, description, latitude, longitude, publicKey, createdAt, updatedAt) {
        this.id = id;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.publicKey = publicKey;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

 class TrendingPosts {
    static trendingPosts = []; // can be optimized (current lookup is O(n))

    static getTrendingPosts = async () => {
        if (this.trendingPosts.length === 0) {
            const result = await Configuration.query(`SELECT * FROM ${Configuration.postTableName}`);    
            this.trendingPosts = result; 
            this.trendingPosts = this.trendingPosts.map(trendingPost => _.mapKeys(trendingPost, (v, k) => _.camelCase(k))); 
        }
        return this.trendingPosts;
    };

    static updateTrendingPosts = async (post) => {
        const {id, description, latitude, longitude, secretKey, votes} = post;
        await this.getTrendingPosts();
        const connection = await Configuration.con();
        let result = null;
        try {
            var trendingPost = this.trendingPosts.find(post => post.id === id);
            await connection.beginTransaction();
            if (trendingPost == undefined) {
                result = await connection.query(`INSERT INTO ${Configuration.postTableName} (Description, Latitude, Longitude, SecretKey, Votes) VALUES ('${description}', '${latitude}', '${longitude}', '${secretKey}', '${votes}')`);
                this.trendingPosts.push(post);
            }
            else {
                result = await connection.query(`UPDATE ${Configuration.postTableName} SET Votes = Votes + 1 WHERE Id = ${trendingPost.id}`);
                this.trendingPosts = this.trendingPosts.map(trendingPost => {
                    if (trendingPost.id === id) {
                        trendingPost.votes++;
                        return trendingPost;
                    } else {
                        return trendingPost;
                    }
                });
            }
            await connection.commit();
        }
        catch (err) {
            console.log(`rolling back, errors. ${err}`);
            await connection.rollback();
        }
        await connection.end();
        return result;
    }
}

module.exports = TrendingPosts;