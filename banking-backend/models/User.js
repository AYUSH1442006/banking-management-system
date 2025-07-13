import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: String, // "deposit" or "withdraw"
  amount: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [transactionSchema], // Embedded transactions
});

const User = mongoose.model("User", userSchema);
export default User;