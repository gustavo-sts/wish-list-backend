const router = require('express').Router();
const Wish = require("../models/wishesSchema");

router.post("/", async (req, res) => {
  console.log("Requisição recebida:", req.body); // Log para verificar os dados recebidos
  try {
    if (!req.body.title) {
      return res.status(400).send("O campo 'title' é obrigatório.");
    }

    const newWish = new Wish(req.body);
    console.log(newWish)
    await newWish.save();

    res.status(201).send(newWish);
  } catch (err) {
    console.error("Erro ao criar a tarefa:", err); // Aqui você captura o erro real
    res.status(500).send(`Erro ao criar a tarefa: ${err.message}`);
  }
});


router.get("/", async (req, res) => {
  try {
    const Wishes = await Wish.find();
    res.send(Wishes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar tarefas");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedWish = await Wish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedWish) {
      return res.status(404).send("Tarefa não encontrada");
    }
    res.send(updatedWish);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar a tarefa");
  }
});

module.exports = router