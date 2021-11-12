const mysql = require("mysql");

class Configuration {
  static mysqlHost = process.env.MYSQL_HOST;
  static mysqlUser = process.env.MYSQL_USER;
  static mysqlPassword = process.env.MYSQL_ROOT_PASSWORD;
  static mysqlDatabase = process.env.MYSQL_DATABASE;

  static postTableName = "TrendingPost";

  static con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    static query = async (query) => {
      try {
        this.con.query(query, (err, result) => {
          if (err) {
            throw err;
          }
          return result;
        })
      }
      catch (err) {
        return err;
      }
    }
}

module.exports = {Configuration};