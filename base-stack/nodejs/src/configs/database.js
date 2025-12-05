import mongoose from "mongoose";
import envConfig from "./env.js";

export async function connectMongoDB() {
  await mongoose
    .connect(envConfig.MONGODB_URI, {
      dbName: envConfig.MONGODB_DB_NAME,
    })
    .then(function (value) {
      console.log(`Connected to MongoDB::`, value.connections[0].name);
    })
    .catch(function (error) {
      console.error(`Failed to connect to MongoDB::`, error);
      process.exit(1);
    });
}
