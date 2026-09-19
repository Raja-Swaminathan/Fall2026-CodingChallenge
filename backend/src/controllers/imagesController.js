// imagesController.js
// Logic for adding, listing, editing, and removing images inside collections.

const Image = require("../models/Image");

// GET /api/collections/:collectionId/images
// Lists every image saved inside one specific collection.
async function getImagesForCollection(req, res) {
  try {
    const images = await Image.find({
      collectionId: req.params.collectionId,
    }).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
}

// POST /api/collections/:collectionId/images
// Body: { imageUrl, previewUrl, tags, pixabayId, note }
// Saves a new image into a collection (typically one picked from search results).
async function addImageToCollection(req, res) {
  try {
    const { imageUrl, previewUrl, tags, pixabayId, note } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl is required" });
    }

    const image = await Image.create({
      collectionId: req.params.collectionId,
      imageUrl,
      previewUrl,
      tags,
      pixabayId,
      note,
    });

    res.status(201).json(image);
  } catch (error) {
    console.error("Error adding image:", error);
    res.status(500).json({ error: "Failed to add image" });
  }
}

// PUT /api/images/:id
// Body: { note: "new caption text" }
// This is what satisfies "edit content in their collections" — you can't
// change the image itself, but you can edit your own note/caption on it.
async function updateImage(req, res) {
  try {
    const { note } = req.body;

    const image = await Image.findByIdAndUpdate(
      req.params.id,
      { note },
      { new: true } // return the UPDATED document, not the old one
    );

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json(image);
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ error: "Failed to update image" });
  }
}

// DELETE /api/images/:id
// Removes a single image from its collection.
async function deleteImage(req, res) {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
}

module.exports = {
  getImagesForCollection,
  addImageToCollection,
  updateImage,
  deleteImage,
};
