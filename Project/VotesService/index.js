const { query } = require('express');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { listVoted, vote } = require('./service');
const app = express()
const port = 5003 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post('/vote', async (req, res) => {
  // let queries = [`UPDATE ${req.body.type} SET Votes = Votes + 1 WHERE id = ${req.body.id}`, `INSERT INTO ${joinTableName} (ObjectId, Type, PublicKey) VALUES ('${req.body.id}', '${req.body.type}', '${req.body.pubKey}')`];
  // queries = queries.map(query => {
  //   return {
  //     query,
  //     wantResult: true
  //   }
  // });
  // try {
  //   await databaseContext(queries[0], queries[1]);
  //   req.body.votes++;
  //   await updateTrendingPosts(req.body);
  //   return res.status(200).json({"msg": `success`});
  // } catch (err) {
  //   return res.status(500).json({"msg": `Error: ${err}`});
  // }    
  try {
    await vote(req.body.id, req.body.pubKey, req.body.type, req.body);
    return res.status(200).json({"msg": `success`});
  } 
  catch(err) {
    console.log(err);
    return res.status(500).json({"msg": `Error: ${err}`});
  }
})

app.post('/isVoted', async (req, res) => {
  try {
    const result = await listVoted(req.body.type, req.body.objectIds, req.body.pubKey);
    console.log(result);
    return res.status(200).json({'msg': 'success', 'data': result});
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({'msg': `Error: ${err}`, 'data': null});
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
    