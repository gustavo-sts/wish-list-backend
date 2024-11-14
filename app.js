const express = require("express");
const app = express();
const conn = require("./connection/conn");
const wishesRouter = require("./source/routes/wishes");
const cors = require("cors");

conn();

app.use(cors());
app.use(express.json());

app.use("/", wishesRouter);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});