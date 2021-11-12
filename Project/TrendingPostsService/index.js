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

app.get('/', async (req, res) => {
    try {
        const posts = await TrendingPosts.getTrendingPosts();
        return res.status(200).json(posts);
    } catch(err) {
        return res.status(500).json({"msg": `${err}`});
    }
})
app.post('/updateTrendingPosts', async (req, res) => {
    try {
        const post = req.body;
        await TrendingPosts.updatePost(post);
        return res.status(200).json({"msg": "Post added successfully"});
    } catch (err) {
        return res.status(500).json({"msg": `${err}`});
    }
})
app.listen(port, '0.0.0.0', ()=>{
    console.log(process.env.MYSQL_HOST);
    console.log(`listening on port ${port}`);
});