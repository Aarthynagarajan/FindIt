const express = require("express");
const router = express.Router();

const LostItem = require("../models/lostitem");
const FoundItem = require("../models/foundItem");


// POST LOST ITEM
router.post("/lost", async (req, res) => {
  try {
    const item = new LostItem(req.body);
    await item.save();
    res.json({ message: "Lost item posted" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error posting lost item" });
  }
});


// POST FOUND ITEM
router.post("/found", async (req, res) => {
  try {
    const item = new FoundItem(req.body);
    await item.save();
    res.json({ message: "Found item posted" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error posting found item" });
  }
});


// GET ALL LOST ITEMS
router.get("/lost", async (req, res) => {
  const items = await LostItem.find();
  res.json(items);
});


// GET ALL FOUND ITEMS
router.get("/found", async (req, res) => {
  const items = await FoundItem.find();
  res.json(items);
});

module.exports = router;
