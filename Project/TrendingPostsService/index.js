const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const Configuration = require ("./configuration");
const TrendingPosts = require('./trendingPosts');
const app = express();
const port = 5000;
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/ee', (req, res) => {
    return res.status(200).json(TrendingPosts.getTrendingPosts());
})
app.listen(port, '0.0.0.0', ()=>{
    console.log(process.env.MYSQL_HOST);
    console.log(`listening on port ${port}`);
});