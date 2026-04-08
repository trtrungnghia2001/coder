import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", favoriteRoutes);

const start = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Favorite service running on port ${process.env.PORT}`);
  });
};

start();
