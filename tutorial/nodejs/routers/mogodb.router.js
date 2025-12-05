import express from "express";
import taskModel from "../models/task.model.js";

const mongoDBRouter = express.Router();

mongoDBRouter.post(`/create`, async (req, res) => {
  const newTask = await taskModel.create(req.body);

  res.json(newTask);
});
mongoDBRouter.put(`/update/:id`, async (req, res) => {
  const updateTask = await taskModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.json(updateTask);
});
mongoDBRouter.delete(`/delete/:id`, async (req, res) => {
  const deleteTask = await taskModel.findByIdAndDelete(req.params.id, {
    new: true,
  });

  res.json(deleteTask);
});
mongoDBRouter.get(`/get-all`, async (req, res) => {
  const getTasks = await taskModel.find().sort({
    createdAt: -1,
  });

  res.json(getTasks);
});
export default mongoDBRouter;
