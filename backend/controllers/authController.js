const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
exports.register = async (req, res) => {
  try {
    const { name, collegeId, email, password, role } = req.body;

    if (!name || !collegeId || !password)
      return res.status(400).json({ error: "Missing required fields" });

    const exists = await User.findOne({ collegeId });
    if (exists) return res.status(400).json({ error: "College ID already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      collegeId,
      email,
      password: hashed,
      role: role || "student"
    });

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  try {
    const { collegeId, password } = req.body;

    const user = await User.findOne({ collegeId });
    if (!user) return res.status(400).json({ error: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        collegeId: user.collegeId,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        collegeId: user.collegeId,
        role: user.role,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET LOGGED IN USER DETAILS
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user)
      return res.status(404).json({ error: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
