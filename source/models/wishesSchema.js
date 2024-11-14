const mongoose = require("mongoose");

const WishSchema = mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const Wish = mongoose.model("Wish", WishSchema);

module.exports = Wish;