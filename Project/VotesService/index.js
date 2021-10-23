const { query } = require('express');
const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3003
app.use(express.json());
app.use(express.urlencoded());


let con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

app.post('/vote', (req, res) => {
    try {
        con.connect(function(err) {
            if (err) throw err;
            query_db(con, `UPDATE ${req.body.type} SET Votes = Votes + 1 WHERE id = ${req.body.id}`);        
        });
        return res.status(200).json({"msg": "success"});
    }
    catch(err) {
        return res.status(500).json({"msg": `Error: ${err}`});
    }
    
})

app.listen(port, '0.0.0.0', () => {
  console.log(`votes service listening at http://localhost:${port}`)
})

function query_db(con, str){

    con.query(str, function (err, result, fields) {
        if (err) throw err;
            console.log(result);
        });
}
    