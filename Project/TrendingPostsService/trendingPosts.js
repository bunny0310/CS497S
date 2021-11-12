const {Configuration} = require("./configuration");
class Post {
    constructor(id, description, latitude, longitude, publicKey, createdAt, updatedAt) {
        this.id = id;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.publicKey = publicKey;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

 class TrendingPosts {
    static trendingPosts = [];

    static getTrendingPosts = async () => {
        if (this.trendingPosts.length === 0) {
            const result = await Configuration.query(`SELECT * FROM ${Configuration.postTableName}`);    
            this.trendingPosts = result; 
        }
        return this.trendingPosts;
    };

    static updateTrendingPosts = async (post) => {
        const {description, latitude, longitude, secretKey, votes} = post;
        post.id = this.trendingPosts.length + 1;
        const result = await Configuration.query(`INSERT INTO ${Configuration.postTableName} (Description, Latitude, Longitude, SecretKey, Votes) VALUES ('${description}', '${latitude}', '${longitude}', '${secretKey}', '${votes}')`);
        this.trendingPosts.push(post);
        return result;
    }
}

module.exports = TrendingPosts;