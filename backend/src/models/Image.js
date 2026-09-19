// Image.js
// Defines the shape of an "Image" document — a single saved image that
// lives inside a Collection. Each image points back to its parent
// collection via collectionId (a MongoDB "reference," similar to a
// foreign key in a SQL database).

const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    // The original Pixabay image ID — not required, but useful later if
    // we want to avoid saving the exact same image twice.
    pixabayId: {
      type: Number,
    },
    // The full-size image URL, used when actually displaying the image.
    imageUrl: {
      type: String,
      required: true,
    },
    // A smaller/faster-loading version, shown in grid views.
    previewUrl: {
      type: String,
    },
    // Comma-separated tags from Pixabay (e.g. "sunset, beach, ocean"),
    // kept as a plain string for simplicity rather than an array.
    tags: {
      type: String,
      default: "",
    },
    // A user-editable caption/note. This is what satisfies the "edit
    // content in their collections" requirement — the image itself
    // isn't editable, but this note is.
    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Image", imageSchema);
