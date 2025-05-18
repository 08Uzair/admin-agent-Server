import express from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  getTaskById,
  updateTask,
} from "../controllers/task.js";

export const taskRouter = express.Router();
taskRouter.post("/", addTask);
taskRouter.get("/", getTasks);
taskRouter.get("/:id", getTaskById);
taskRouter.delete("/:id", deleteTask);
taskRouter.put("/:id", updateTask);
