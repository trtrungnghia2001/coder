import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRouter.js";
import connectDB from "./utils/db.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`[Auth Service] ${req.method} ${req.originalUrl}`);
  console.log(req.body);
  next();
});
app.use("/", authRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Auth service running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
