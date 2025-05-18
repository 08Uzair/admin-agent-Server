import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dataBaseConnection } from "./db/connection.js";
import { agentRouter } from "./routes/agent.js";
import { taskRouter } from "./routes/task.js";
import { userRouter } from "./routes/auth.js";
import { listRouter } from "./routes/list.js";

const app = express();
const PORT = 8400;
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/v1/agent", agentRouter);
app.use("/api/v1/list", listRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/user", userRouter);
dataBaseConnection();
app.listen(PORT, () => {
  console.log(`SERVER IS CONNECTED TO PORT : ${PORT}`);
});
