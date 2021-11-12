const mysql = require("mysql2/promise");

class Configuration {
  static mysqlHost = process.env.MYSQL_HOST;
  static mysqlUser = process.env.MYSQL_USER;
  static mysqlPassword = process.env.MYSQL_ROOT_PASSWORD;
  static mysqlDatabase = process.env.MYSQL_DATABASE;

  static postTableName = "TrendingPost";

  static con = async () => {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
    return connection;
  }

  static query = async (query) => {
    const connection = await this.con();
    const [rows, fields] = await connection.query(query);
    return rows;
  }
}

module.exports = {Configuration};