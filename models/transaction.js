var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  value: { type: Number, required: true },
  student_id: { type: String, required: true, ref: "User" },
  description: { type: String, required: true },
  created_at: {
    type: Number,
    required: true,
    default: parseInt(new Date().getTime() / 1000),
  },
  updated_at: { type: Number },
  rest: { type: Number },
});

// transactions
module.exports = mongoose.model("Transaction", TransactionSchema);
