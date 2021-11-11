import {mysql} from "mysql";

const mysqlHost: string = process.env.MYSQL_HOST;
const mysqlUser: string = process.env.MYSQL_USER;
const mysqlPassword: string = process.env.MYSQL_ROOT_PASSWORD;
const mysqlDatabase: string = process.env.MYSQL_DATABASE;

let con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });