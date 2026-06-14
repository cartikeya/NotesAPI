const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

async function main() {
  const client = new MongoClient(url);

  await client.connect();

  console.log("Connected to MongoDB!");

  const db = client.db("Notes");

  const notesCollection = db.collection("notes");

  const notes = await notesCollection.find().toArray();
//   const notes = await notesCollection.insertOne({ text: "learn aeroplane" });


  console.log(notes);

  await client.close();
}

main();
