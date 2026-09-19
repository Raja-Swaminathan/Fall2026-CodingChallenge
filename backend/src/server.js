// server.js
// The entry point for our backend. This file's job is just to:
//   1. Load environment variables from .env
//   2. Connect to the database
//   3. Set up middleware and routes
//   4. Start listening for requests
// The actual logic for each route lives in controllers/, not here.

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connection");
const collectionsRouter = require("./routes/collections");
const { collectionImagesRouter, imageItemRouter } = require("./routes/images");
const searchRouter = require("./routes/search");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Kept from step 1, useful as a quick "is the server alive" check.
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Any request to /api/collections gets handed off to collectionsRouter,
// which decides what to do based on the method (GET, POST, etc).
app.use("/api/collections", collectionsRouter);

// Nested under /api/collections/:collectionId/images — this is what lets
// collectionImagesRouter (mounted with mergeParams) read :collectionId.
app.use("/api/collections/:collectionId/images", collectionImagesRouter);

// Flat routes for acting on one image directly, once we already know its ID.
app.use("/api/images", imageItemRouter);

// Pixabay search, proxied through our own backend.
app.use("/api/search", searchRouter);

// We only start listening AFTER the database connection succeeds —
// this avoids the server accepting requests it can't actually fulfill.
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error.message);
    process.exit(1);
  });
