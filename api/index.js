const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer();

const CONNECTION_STRING = "mongodb+srv://admin:admin123@cluster0.guschys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASENAME = "sign-language-dictionary";

let db;

MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error("MongoDB connection failed:", err);
    return;
  }
  db = client.db(DATABASENAME);
  console.log("MongoDB Connected Successfully");
});

app.get("/words", async (req, res) => {
  try {
    const words = await db.collection("sldcollection")
      .find({})
      .sort({ word: 1 }) 
      .toArray();
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch words" });
  }
});

app.get("/words/:query", async (req, res) => {
  try {
    const query = req.params.query.trim().toLowerCase();
    const word = await db.collection("sldcollection").findOne({ word: query });
    if (word) {
      res.json(word);
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching word" });
  }
});

app.post("/words", upload.none(), async (req, res) => {
  try {
    const { word, definition, imageUrl, videoUrl } = req.body;

    if (!word || !definition || !imageUrl || !videoUrl) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await db.collection("sldcollection").insertOne({
      word: word.trim().toLowerCase(),
      definition,
      imageUrl,
      videoUrl,
    });

    res.json({ message: "Word added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding word" });
  }
});

app.put("/words/:originalWord", upload.none(), async (req, res) => {
  try {
    const originalWord = req.params.originalWord.trim().toLowerCase();
    const { word, definition, imageUrl, videoUrl } = req.body;

    if (!word || !definition || !imageUrl || !videoUrl) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const result = await db.collection("sldcollection").updateOne(
      { word: originalWord },
      {
        $set: {
          word: word.trim().toLowerCase(),
          definition,
          imageUrl,
          videoUrl
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Word not found" });
    }

    res.json({ message: "Word updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating word" });
  }
});

app.delete("/words/:word", async (req, res) => {
  try {
    const wordToDelete = req.params.word.trim().toLowerCase();
    const result = await db.collection("sldcollection").deleteOne({ word: wordToDelete });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Word not found" });
    }

    res.json({ message: "Word deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting word" });
  }
});

app.listen(5038, () => {
  console.log("Server started on port 5038");
});
