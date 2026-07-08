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

module.exports = router;
