// const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;
app.use(express.json());
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MONGODB connected"))
  .catch((err) => console.log(err));

app.use("/", authRoutes);
app.use("/", noteRoutes);

app.get("/", (req, res) => {
  res.send("Notes API running");
});


app.put("/notes/:id", async (req, res) => {
  const notesId = req.params.id;
  const objectId = new ObjectId(notesId);

  const result = await Notes.updateOne(
    { _id: objectId },
    {
      $set: {
        text: req.body.text,
      },
    },
  );
  if (result.matchedCount === 0) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.json({ message: "note updated successfully", result });
});

app.listen(PORT, () => console.log(`server running on localhost:${PORT}`));
