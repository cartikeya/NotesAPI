const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

let notesCollection;
app.use(express.json());
async function startServer() {
  const client = new MongoClient("mongodb://localhost:27017");

  await client.connect();
  console.log("Connected to MongoDB!");

  const db = client.db("Notes");

  notesCollection = db.collection("notes");

  app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
}

startServer();

app.get("/", (req, res) => {
  res.send("Notes API running");
});
app.get("/notes", async (req, res) => {
  const notes = await notesCollection.find().toArray();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const newNote = { text: req.body.text };
  if (!req.body.text) {
    return res.status(400).json({
      message: "text is required",
    });
  }
  await notesCollection.insertOne(newNote);
  res.json({
    message: "Note added succesfull",
    note: newNote,
  });
});

app.delete("/notes/:id", async (req, res) => {
  const notesId = req.params.id;
  const objectId = new ObjectId(notesId);
  const result = await notesCollection.deleteOne({ _id: objectId });
  if (result.deletedCount == 0) {
    return res.status(404).json({
      message: "Note Not found",
    });
  }
  res.json({ message: "Note deleted successfully" });
});

app.put("/notes/:id", async (req, res) => {
  const notesId = req.params.id;
  const objectId = new ObjectId(notesId);

  const result = await notesCollection.updateOne(
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

// app.listen(PORT, () => console.log(`server running on localhost:${PORT}`));
