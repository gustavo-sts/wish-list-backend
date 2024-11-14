// api/wishes.js
const { connectToDatabase } = require("../connection/conn"); // Importe a função para conectar com o MongoDB
const Wish = require("../models/wishesSchema"); // Supondo que você tenha o modelo 'Wish'

module.exports = async (req, res) => {
  // Configuração CORS para permitir requisições de qualquer origem
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permite qualquer origem
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Métodos permitidos
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Cabeçalhos permitidos

  if (req.method === "OPTIONS") {
    // Responde para o preflight (OPTIONS)
    return res.status(200).end();
  }

  // Se for POST (ou qualquer outro método permitido)
  if (req.method === "POST") {
    try {
      // Conectar ao banco de dados MongoDB
      await connectToDatabase();

      // Criar uma nova "wish" com os dados do corpo da requisição
      const { title } = req.body;
      const newWish = new Wish({ title, done: false });
      await newWish.save();

      // Retornar o novo "wish" no formato JSON
      return res.status(201).json(newWish);
    } catch (error) {
      console.error("Erro ao criar a tarefa", error);
      return res.status(500).json({ message: "Erro ao criar a tarefa", error });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido" });
  }
};
