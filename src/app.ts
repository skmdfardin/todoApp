import express from "express";
import { TodoApi } from "./api/TodoApi";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const todoApi = new TodoApi();
app.use("/api/todos", todoApi.getRouter());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
