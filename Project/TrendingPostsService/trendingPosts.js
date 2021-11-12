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

static class TrendingPosts {
    static trendingPosts = [];

    static getTrendingPosts = () => {
        if (this.trendingPosts.length === 0) {
            var con = Configuration.con;
            
        }
    };
}