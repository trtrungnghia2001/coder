import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import ENV_CONFIG from "./configs/env.config.js";
import { connectMongoDB, connectMySql } from "./configs/database.config.js";
import mongoDBRouter from "./routers/mogodb.router.js";
import mySqlRouter from "./routers/mysql.router.js";

connectMongoDB();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(`/mongodb/task`, mongoDBRouter);
app.use(`/mysql/task`, mySqlRouter);

app.listen(ENV_CONFIG.PORT, (error) => {
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  console.log(`Server run on port:: ` + ENV_CONFIG.PORT);
});
