const itemRoutes = require("./routes/items");
const authRoutes = require("./routes/auth");
const User = require("./models/user");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");


require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/items", itemRoutes);



// test route
app.get("/", (req, res) => {
  res.send("Server running successfully");
});

app.get("/add-test-user", async (req, res) => {
  const newUser = new User({
    name: "Test Student",
    registerNo: "22CS001",
    department: "CSE",
    year: "2",
    phone: "9999999999",
    password: "123456"
  });

  await newUser.save();
  res.send("Test user added");
});
// serve frontend
app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});



// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

