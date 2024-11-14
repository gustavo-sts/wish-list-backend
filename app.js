const express = require("express");
const app = express();
const conn = require("./connection/conn");
const wishesRouter = require("./source/routes/wishes");
const cors = require("cors");

conn(); // A conexão com o banco de dados

app.use(cors());
app.use(express.json()); // Adicionando o middleware para garantir que o corpo da requisição seja interpretado como JSON

app.use("/", wishesRouter);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});