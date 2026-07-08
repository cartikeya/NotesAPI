const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { Note } = require("../models/Note");
const router = express.Router();

router.post("/notes", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "enter required details" });
  }
  try {
    const newNote = await Note.create({
      title,
      content,
      user: req.user.userId,
    });
    res.status(201).json({ message: "Note created successfully", newNote });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/notes", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.userId,
    });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.delete("/notes/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    const result = await Note.deleteOne({ _id: req.params.id });
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});



module.exports = router;
