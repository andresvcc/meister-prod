// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mysql = require('mysql');

const con = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD_PROD,
  database: process.env.MYSQL_DATABASE,
});

const asyncQuery = (query) => new Promise((resolve) => {
  con.query(query, (err, results) => {
    if (err) {
      console.log('DB connection err');
      resolve(err);
    } else {
      console.log('DB connection ok');
      resolve(results);
    }
  });
});

module.exports = asyncQuery;
