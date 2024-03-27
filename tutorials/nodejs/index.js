import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./features/database/connect.js";
import { crud_node_route_mongodb } from "./features/crud/crud_node_route.js";
import node_email from "./features/email/email_route.js";
import { auth_route_mongodb } from "./features/auth/auth_route.js";
dotenv.config();
const port = 8000;
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

connectDB();
app.listen(port, () => {
  console.log(`server running is port`, port);
});

app.use("/api/crud_mongodb", crud_node_route_mongodb);
app.use("/api/email", node_email);
app.use("/api/auth", auth_route_mongodb);
