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

app.listen(PORT, () => console.log(`server running on localhost:${PORT}`));
