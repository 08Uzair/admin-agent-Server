import express from "express";
import {
  addList,
  deleteList,
  getLists,
  getListById,
  updateList,
} from "../controllers/list.js";

export const listRouter = express.Router();
listRouter.post("/", addList);
listRouter.get("/", getLists);
listRouter.get("/:id", getListById);
listRouter.delete("/:id", deleteList);
listRouter.put("/:id", updateList);
