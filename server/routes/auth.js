const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, registerNo, department, year, phone, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ registerNo });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      name,
      registerNo,
      department,
      year,
      phone,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "Signup successful" });

  } catch (error) {
    console.log(error);
    res.json({ message: "Error signing up" });
  }
});

module.exports = router;

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { registerNo, password } = req.body;

    // find user
    const user = await User.findOne({ registerNo });
    if (!user) {
      return res.json({ message: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user: {
        name: user.name,
        registerNo: user.registerNo,
        department: user.department,
        year: user.year,
        phone: user.phone
      }
    });

  } catch (error) {
    console.log(error);
    res.json({ message: "Login error" });
  }
});

