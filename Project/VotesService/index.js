const { query } = require('express');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql')
const app = express()
const port = 5003 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


let con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

const joinTableName = "UserVoteJoins"
app.post('/vote', (req, res) => {
    try {
        con.beginTransaction(function(err) {
            if (err) throw err;
            con.query(`UPDATE ${req.body.type} SET Votes = Votes + 1 WHERE id = ${req.body.id}`, (err, result) => {
                if (err) { 
                    con.rollback(function() {
                      throw err;
                    });
                  }
            })
            con.query(`INSERT INTO ${joinTableName} (ObjectId, Type, PublicKey) VALUES ('${req.body.id}', '${req.body.type}', '${req.body.pubKey}')`, (err, result) => {
                if (err) { 
                    con.rollback(function() {
                      throw err;
                    });
                }

                con.commit(function(err) {
                    if (err) { 
                      con.rollback(function() {
                        throw err;
                      });
                    }
                    return res.status(200).json({"msg": `success`});
                  });
            })    
        });
    }
    catch(err) {
        return res.status(500).json({"msg": `Error: ${err}`});
    }
    
})

app.post('/isVoted', (req, res) => {
  try {
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
    return res.status(500).json({'msg': 'failure', 'data': []});
  }
})

app.listen(port, '0.0.0.0', () => {
  console.log(`votes service listening at http://localhost:${port}`)
})

async function query_db(con, str){
    con.query(str, function (err, result, fields) {
        if (err) throw err;
        });
}
    