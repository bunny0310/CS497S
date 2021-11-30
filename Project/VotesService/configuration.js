const mysql = require("mysql2/promise");

class Configuration {
    static isProduction = process.env.NODE_ENV === 'production';
    static async generateConnection(shardNumber = 1) {
        let hostname = process.env.MYSQL_HOST;
        if (Configuration.isProduction) {
            hostname += `-${shardNumber}`;
        }
        const con = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_ROOT_PASSWORD,
            database: process.env.MYSQL_DATABASE 
            });
        return con;
    }
    static numberOfShards = parseInt(process.env.NUMBER_SHARDS);
}

module.exports = {Configuration};