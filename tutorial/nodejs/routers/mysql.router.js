import express from "express";
import { connectMySql } from "../configs/database.config.js";

const mySqlRouter = express.Router();

mySqlRouter.post(`/create`, async (req, res) => {
  const { task, description, compeleted } = req.body;

  const sql = `insert into task (task, description, compeleted) values (?, ?, ?)`;
  connectMySql.query(sql, [task, description, compeleted], (err, result) => {
    if (err) throw err.message;
    res.json({ _id: result.insertId, ...req.body });
  });
});
mySqlRouter.put(`/update/:id`, async (req, res) => {
  const { task, description, compeleted } = req.body;
  const sql = `update task set task = ?, description = ?, compeleted = ? where _id = ?`;
  connectMySql.query(
    sql,
    [task, description, compeleted, req.params.id],
    (err, result) => {
      if (err) throw err.message;
      res.json({ _id: result.insertId, ...req.body });
    }
  );
});
mySqlRouter.delete(`/delete/:id`, async (req, res) => {
  const sql = `delete from task where _id = ?`;
  connectMySql.query(sql, [req.params.id], (err, result) => {
    if (err) throw err.message;
    res.json({ _id: result.insertId });
  });
});
mySqlRouter.get(`/get-all`, async (req, res) => {
  const sql = `select * from task order by created_at desc`;
  connectMySql.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
export default mySqlRouter;
