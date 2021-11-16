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
        let limit = parseInt(req.query['limit']) || 5;
        const offset = parseInt(req.query['offset']) || 0;
        if (limit < 0 || offset < 0) {
            return res.status(400).json({"msg" : "Incorrect limit or offset values"});
        }
        if (offset >= posts.length) {
            return res.status(200).json([]);
        }
        if (offset + limit > posts.length) {
            limit = posts.length - offset;
        }
        return res.status(200).json(posts.slice(offset, offset + limit));
    } catch(err) {
        return res.status(500).json({"msg": `${err}`});
    }
})
app.post('/updateTrendingPosts', async (req, res) => {
    try {
        const post = req.body;
        await TrendingPosts.updateTrendingPosts(post);
        return res.status(200).json({"msg": "Post added successfully"});
    } catch (err) {
        console.log(err);
        return res.status(500).json({"msg": `${err}`});
    }
})
app.listen(port, '0.0.0.0', ()=>{
    console.log(process.env.MYSQL_HOST);
    console.log(`listening on port ${port}`);
});