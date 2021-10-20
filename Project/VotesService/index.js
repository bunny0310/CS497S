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


app.get("/", (req, res) => {
    return "Hello World"
});

app.post('/vote', (req, res) => {
    //let sample_input = {"id" : "001", "type" : "Comments"}
    con.connect(function(err) {
        if (err) throw err;
        query_db(con, "UPDATE " + sample_input.type + " SET Votes = Votes + 1 WHERE id = " + sample_input.id)        
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function query_db(con, str){

    con.query(str, function (err, result, fields) {
        if (err) throw err;
            console.log(result);
        });
}
    