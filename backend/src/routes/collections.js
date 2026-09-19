// routes/collections.js
// Maps HTTP methods + URLs to controller functions.
// This file should stay thin — no real logic here, just wiring.
//
// IMPORTANT: /shared/:token is defined BEFORE /:id. Express checks routes
// top-to-bottom and matches the first one that fits — if /:id came first,
// a request to /shared/abc123 would incorrectly match /:id with
// id = "shared" (which isn't a valid ID, but Express wouldn't know that
// until it actually tried the database lookup).

const express = require("express");
const router = express.Router();
const {
  getAllCollections,
  createCollection,
  getCollectionById,
  getCollectionByShareToken,
  deleteCollection,
} = require("../controllers/collectionsController");

router.get("/", getAllCollections);
router.post("/", createCollection);
router.get("/shared/:token", getCollectionByShareToken);
router.get("/:id", getCollectionById);
router.delete("/:id", deleteCollection);

module.exports = router;
