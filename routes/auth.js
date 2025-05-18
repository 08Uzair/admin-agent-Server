import express from "express";

import { getUsers, getUserById, signIn, signUp } from "../controllers/auth.js";

export const userRouter = express.Router();
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/signIn", signIn);
userRouter.post("/signUp", signUp);
