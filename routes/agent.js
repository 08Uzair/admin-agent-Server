import express from "express";
import {
  addAgent,
  deleteAgent,
  getAgents,
  getAgentById,
  updateAgent,
} from "../controllers/agent.js";

export const agentRouter = express.Router();
agentRouter.post("/", addAgent);
agentRouter.get("/", getAgents);
agentRouter.get("/:id", getAgentById);
agentRouter.delete("/:id", deleteAgent);
agentRouter.put("/:id", updateAgent);
