const Redis = require("ioredis");
const express = require("express");
const app = express();

const redis = new Redis(); // mặc định là 127.0.0.1:6379

app.use(express.json());

// Test Redis
app.get("/set", async (req, res) => {
  await redis.set("hello", "Redis with Node.js");
  res.send("Đã set!");
});

app.get("/get", async (req, res) => {
  const data = await redis.get("hello");
  res.send(`Giá trị: ${data}`);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
