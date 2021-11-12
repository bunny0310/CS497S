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

    static getTrendingPosts = () => {
        if (this.trendingPosts.length === 0) {
            Configuration.query(`SELECT * FROM ${Configuration.postTableName}`)
            .then(result => {
               this.trendingPosts.push(1);
               return this.trendingPosts;
            })
            .catch(err => {
                return err;
            })           
        }
        return this.trendingPosts;
    };
}

module.exports = TrendingPosts;