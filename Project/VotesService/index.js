const { query } = require('express');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const axios = require('axios').default;
const app = express()
const port = 5003 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const joinTableName = "UserVoteJoins"
const trendingPostsServiceHost = process.env.TRENDING_POSTS_SERVICE_URL || 'http://trending_posts_service:5000';

app.post('/vote', async (req, res) => {
  let queries = [`UPDATE ${req.body.type} SET Votes = Votes + 1 WHERE id = ${req.body.id}`, `INSERT INTO ${joinTableName} (ObjectId, Type, PublicKey) VALUES ('${req.body.id}', '${req.body.type}', '${req.body.pubKey}')`];
  queries = queries.map(query => {
    return {
      query,
      wantResult: true
    }
  });
  try {
    await databaseContext(queries[0], queries[1]);
    req.body.votes++;
    await updateTrendingPosts(req.body);
    return res.status(200).json({"msg": `success`});
  } catch (err) {
    return res.status(500).json({"msg": `Error: ${err}`});
  }    
})

app.post('/isVoted', async (req, res) => {
  try {
    let con = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE 
    });
    const [rows, fields] = await con.query(`SELECT * FROM ${joinTableName} WHERE Type='${req.body.type}' AND ObjectId IN (${req.body.objectIds}) AND PublicKey='${req.body.pubKey}'`);
    const set = new Set(); 
    for (let i = 0; i < rows.length; ++i) {
      let row = rows[i];
      set.add(row.ObjectId);
    }
    return res.status(200).json({'msg': 'success', 'data': Array.from(set)});
  }
  catch (err) {  
    console.log(err);
    return res.status(500).json({'msg': `failure ${err}`, 'data': []});
  }
})

app.listen(port, '0.0.0.0', () => {
  console.log(`votes service listening at http://localhost:${port}`)
})

async function databaseContext(...queries){
    if (queries.length === 0) {
      return null;
    }
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
    try {
      let queryResults = [];
      await connection.beginTransaction();
        for (let queryObj of queries) {
          const result = await connection.query(queryObj["query"]);
            if (queryObj.wantResult) {
              queryResults.push(result);
            }
        }
      await connection.commit();
      return queryResults;
    }
    catch (err) {
      await connection.rollback();
      console.log(err);
      return null;
    }
}

async function updateTrendingPosts(post) {
    const result = await axios.post(`${trendingPostsServiceHost}/updateTrendingPosts`, post);
    return result;
}
    