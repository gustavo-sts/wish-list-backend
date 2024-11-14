const mongoose = require("mongoose");

async function conn() {
  await mongoose.connect("mongodb://localhost:27017/checklists", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = conn;
