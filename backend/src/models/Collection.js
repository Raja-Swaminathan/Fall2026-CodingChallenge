// Collection.js
// Defines the shape of a "Collection" document in MongoDB, using Mongoose.
// Even though MongoDB itself is schema-less, Mongoose lets us describe the
// shape we expect, which catches mistakes early (e.g. saving a number
// where a string was expected).

const mongoose = require("mongoose");
const crypto = require("crypto");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: true, // no accounts yet, so collections are open by default
    },
    shareToken: {
      type: String,
      unique: true,
      // Generates a random 8-character token automatically, e.g. "a1b2c3d4",
      // used to build a shareable URL like /shared/a1b2c3d4
      default: () => crypto.randomBytes(4).toString("hex"),
    },
  },
  {
    // Automatically adds and manages createdAt / updatedAt fields.
    timestamps: true,
  }
);

// "Collection" here becomes the MongoDB collection name "collections"
// (Mongoose lowercases and pluralizes it automatically).
module.exports = mongoose.model("Collection", collectionSchema);
