const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const Configuration = require ("./configuration");
const app = express();
const port = 5002;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.listen(port, "0.0.0.0", ()=>{
    console.log(`listening on port ${port}`);
});