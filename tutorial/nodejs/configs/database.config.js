import mongoose from "mongoose";
import mysql from "mysql2";
import ENV_CONFIG from "./env.config.js";

// mongodb
async function connectMongoDB() {
  mongoose
    .connect(ENV_CONFIG.MONGO_URL, {
      dbName: ENV_CONFIG.DB_NAME,
    })
    .then((value) => {
      console.log(`Connected to MongoDB:: ` + value.connection.name);
    })
    .catch((err) => {
      console.error(`Failed to connect to MongoDB:: ` + err);
      process.exit(1);
    });
}
// mysql
const connectMySql = mysql.createConnection({
  host: ENV_CONFIG.MYSQL_HOST,
  user: ENV_CONFIG.MYSQL_USER,
  password: ENV_CONFIG.MYSQL_PASSWORD,
  database: ENV_CONFIG.DB_NAME,
});
connectMySql.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});
//
export { connectMySql, connectMongoDB };
