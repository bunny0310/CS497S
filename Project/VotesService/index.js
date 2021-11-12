const { query } = require('express');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2')
const app = express()
const port = 5003 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const joinTableName = "UserVoteJoins"
app.post('/vote', (req, res) => {
  let queries = [`UPDATE ${req.body.type} SET Votes = Votes + 1 WHERE id = ${req.body.id}`, `INSERT INTO ${joinTableName} (ObjectId, Type, PublicKey) VALUES ('${req.body.id}', '${req.body.type}', '${req.body.pubKey}')`];
  queries = queries.map(query => {
    return {
      query,
      wantResult: true
    }
  });
  databaseContext(queries[0], queries[1])
  .then(result => {
    console.log(result);
  })
  .catch((err) => {
    return res.status(500).json({"msg": `Error: ${err}`});
  })
  return res.status(200).json({"msg": `success`});
    // try {
    //     con.beginTransaction(function(err) {
    //         if (err) throw err;
    //         con.query(`UPDATE ${req.body.type} SET Votes = Votes + 1 WHERE id = ${req.body.id}`, (err, result) => {
    //             if (err) { 
    //                 con.rollback(function() {
    //                   throw err;
    //                 });
    //               }
    //         })
    //         con.query(`INSERT INTO ${joinTableName} (ObjectId, Type, PublicKey) VALUES ('${req.body.id}', '${req.body.type}', '${req.body.pubKey}')`, (err, result) => {
    //             if (err) { 
    //                 con.rollback(function() {
    //                   throw err;
    //                 });
    //             }

    //             con.commit(function(err) {
    //                 if (err) { 
    //                   con.rollback(function() {
    //                     throw err;
    //                   });
    //                 }
    //                 return res.status(200).json({"msg": `success`});
    //               });
    //         })    
    //     });
    // }
    // catch(err) {
    //     return res.status(500).json({"msg": `Error: ${err}`});
    // }
    
})

app.post('/isVoted', async (req, res) => {
  try {
    let con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE 
    });
    con.query(`SELECT * FROM ${joinTableName} WHERE Type='${req.body.type}' AND ObjectId IN (${req.body.objectIds}) AND PublicKey='${req.body.pubKey}'`, (err, result) => {
      if (err) { 
        throw err;
      }
      const set = new Set(); 
      for (let i = 0; i < result.length; ++i) {
        let row = result[i];
        set.add(row.ObjectId);
      }
      return res.status(200).json({'msg': 'success', 'data': Array.from(set)});
    })
  }
  catch (err) {  
    return res.status(500).json({'msg': `failure ${err}`, 'data': []});
  }
})

app.listen(port, '0.0.0.0', () => {
  console.log(`votes service listening at http://localhost:${port}`)
})

async function databaseContext(...queries){
  try {
    if (queries.length === 0) {
      return null;
    }
    const connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
    let queryResults = [];
    connection.beginTransaction((err) => {
      if (err)
        throw err;
      for (let queryObj of queries) {
        console.log(queryObj);
        connection.query(queryObj["query"], (err, result) => {
          if (err)
            connection.rollback(() => {throw err; });
          if (queryObj.wantResult) {
            queryResults.push(result);
          }
        })
      }
      connection.commit((err) => {
        if (err)
          connection.rollback(() => {throw err; });
        return queryResults;
      })
      return null;
    });
  } catch(err) {
    throw err;
  }
}
    