const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then((value) => {
    console.log(`Successfully:: ` + value.connections[0].name);
  })
  .catch((err) => {
    console.error(`Failed:: ` + err);
  });

const Todo = mongoose.model("Todo", { text: String });

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});

app.get("/actor", async (req, res) => {
  const actors = [`Duong Mich`, `Chau Tinh Tri`, `Chau Tan`, `Angela Baby`];
  res.json(actors);
});

app.get("/", async (req, res) => {
  res.json(`Hello, this is server`);
});

app.listen(5000, () => console.log("Server running on port 5000"));
