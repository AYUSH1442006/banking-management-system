import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_secret_key_here";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// -------------------- MongoDB Connection --------------------
mongoose.connect("mongodb+srv://ayush:ayush1446@cluster1.fgkbzqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// -------------------- Schemas --------------------
const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  accountNumber: String,
  kycStatus: { type: String, default: 'Pending' },
});
const Member = mongoose.model('Member', memberSchema);

const transactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  type: String,
  amount: Number,
  status: String,
  createdAt: { type: Date, default: Date.now },
});
const Transaction = mongoose.model('Transaction', transactionSchema);

const kycRequestSchema = new mongoose.Schema({
  userId: String,
  name: String,
  address: String,
  pan: String,
  aadhar: String,
  idProofUrl: String,
  status: {
    type: String,
    enum: ["Pending", "Verified", "Rejected"],
    default: "Pending"
  },
});
const KYCRequest = mongoose.model("KYCRequest", kycRequestSchema);

// -------------------- ROUTES --------------------

// Root
app.get("/", (req, res) => res.send("🚀 Banking backend server is running!"));

// Signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, balance: 0, transactions: [] });
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      email: user.email,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Deposit
app.post('/api/deposit', async (req, res) => {
  const { email, amount } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || amount <= 0) return res.status(400).json({ message: "Invalid details" });

    user.balance += amount;
    user.transactions.push({ type: 'deposit', amount, date: new Date() });
    await user.save();
    res.status(200).json({ balance: user.balance, transactions: user.transactions });
  } catch (err) {
    res.status(500).json({ message: "Deposit failed" });
  }
});

// Withdraw
app.post('/api/withdraw', async (req, res) => {
  const { email, amount } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || amount <= 0 || user.balance < amount) {
      return res.status(400).json({ message: "Invalid withdrawal" });
    }

    user.balance -= amount;
    user.transactions.push({ type: 'withdraw', amount, date: new Date() });
    await user.save();
    res.status(200).json({ balance: user.balance, transactions: user.transactions });
  } catch (err) {
    res.status(500).json({ message: "Withdraw failed" });
  }
});

// Dashboard
app.get("/api/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.email.split("@")[0],
      accountNumber: user._id.toString().slice(-4).padStart(12, "X"),
      balance: user.balance,
      transactions: user.transactions || [],
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Only Balance
app.get("/api/balance/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// All Transaction History
app.get("/transaction/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send("User not found");
    res.send(user.transactions || []);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// User Profile - Get
app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// User Profile - Update
app.put('/user/:id', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, phone }, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user profile' });
  }
});

// Password Update
app.put('/user/:id/password', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Old password incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating password' });
  }
});

// Submit KYC
app.post("/submit-kyc", async (req, res) => {
  const { userId, name, address, pan, aadhar, idProofUrl } = req.body;
  try {
    const exists = await KYCRequest.findOne({ userId });
    if (exists) return res.status(400).json({ message: "KYC already submitted" });

    const kyc = new KYCRequest({ userId, name, address, pan, aadhar, idProofUrl });
    await kyc.save();
    res.json({ message: "KYC submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit KYC" });
  }
});

// Get all KYC requests
app.get('/get-kyc-requests', async (req, res) => {
  try {
    const requests = await KYCRequest.find();
    res.json(requests);
  } catch (error) {
    console.error('Error fetching KYC requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update KYC status
app.put('/update-kyc-status/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedRequest = await KYCRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'KYC request not found' });
    }

    res.json({ message: 'KYC status updated successfully', updatedRequest });
  } catch (error) {
    console.error('Error updating KYC status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // if you have user model
  },
  loanAmount: {
    type: Number,
    required: true
  },
  loanPurpose: {
    type: String,
    required: true
  },
  loanStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const Loan = mongoose.model('Loan', loanSchema);

// ----------------- Loan Apply Route -----------------

// In your server.js or routes file (example for Express)
app.post("/api/loan/apply", async (req, res) => {
  const { email, loanAmount, loanPurpose } = req.body;

  if (!email || !loanAmount || !loanPurpose) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const loanApplication = await Loan.create({
      userId: user._id,
      loanAmount,
      loanPurpose,
      loanStatus: "Pending",
      appliedAt: new Date(),
    });

    res.status(200).json({ success: true, message: "Loan application submitted successfully", loan: loanApplication });
  } catch (err) {
    console.error("Loan application error:", err);
    res.status(500).json({ success: false, message: "Loan application failed. Please try again later." });
  }
});
app.get("/api/loan/status", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const loans = await Loan.find({ userId: user._id }).sort({ appliedAt: -1 });

    res.status(200).json({ success: true, loans });
  } catch (err) {
    console.error("Fetch loan status error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch loan status" });
  }
});
// Admin: Approve Loan
app.post('/api/approve-loan', async (req, res) => {
  const { loanId } = req.body;
  try {
    const loan = await Loan.findByIdAndUpdate(loanId, { loanStatus: 'Approved' }, { new: true });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: 'Error approving loan' });
  }
});

// Admin: Reject Loan
app.post('/api/reject-loan', async (req, res) => {
  const { loanId } = req.body;
  try {
    const loan = await Loan.findByIdAndUpdate(loanId, { loanStatus: 'Rejected' }, { new: true });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting loan' });
  }
});
// Admin: Fetch all loan applications
app.get("/api/admin/loan-applications", async (req, res) => {
  try {
    const loans = await Loan.find().populate("userId", "email");
    res.status(200).json({ success: true, loans });
  } catch (err) {
    console.error("Admin loan fetch error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch loan applications" });
  }
});



// -------------------- START SERVER --------------------
app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
