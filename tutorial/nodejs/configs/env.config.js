import dotenv from "dotenv";
dotenv.config();

const ENV_CONFIG = {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,

  MONGO_URL: process.env.MONGO_URL,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
};

export default ENV_CONFIG;
