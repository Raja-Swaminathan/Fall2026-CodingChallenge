// collectionsController.js
// Controllers hold the actual logic for what happens when a route is hit.
// Routes just say "this URL maps to this function" — the function itself
// lives here, which keeps routes.js short and readable.

const Collection = require("../models/Collection");
const Image = require("../models/Image");

// GET /api/collections
// Returns every collection. (No accounts yet, so there's no concept of
// "only show my collections" — that comes back once we add auth.)
async function getAllCollections(req, res) {
  try {
    const collections = await Collection.find().sort({ createdAt: -1 });
    res.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Failed to fetch collections" });
  }
}

// POST /api/collections
// Body: { name: "My Collection" }
async function createCollection(req, res) {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      // 400 = "Bad Request" — the client sent something we can't use.
      return res.status(400).json({ error: "Collection name is required" });
    }

    const collection = await Collection.create({ name });
    // 201 = "Created" — the standard status code for a successful POST
    // that creates something new.
    res.status(201).json(collection);
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({ error: "Failed to create collection" });
  }
}

// GET /api/collections/shared/:token
// Looks up a collection by its shareToken instead of its _id.
// This is what powers the shareable-link feature — anyone with the
// link can view (and, since we have no accounts, edit) the collection.
async function getCollectionByShareToken(req, res) {
  try {
    const collection = await Collection.findOne({
      shareToken: req.params.token,
    });

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.json(collection);
  } catch (error) {
    console.error("Error fetching shared collection:", error);
    res.status(500).json({ error: "Failed to fetch collection" });
  }
}

// GET /api/collections/:id
// Fetches a single collection by its database ID (used for the
// collection detail page).
async function getCollectionById(req, res) {
  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.json(collection);
  } catch (error) {
    console.error("Error fetching collection:", error);
    res.status(500).json({ error: "Failed to fetch collection" });
  }
}

// DELETE /api/collections/:id
// Deletes a collection AND every image inside it, so we don't leave
// orphaned images in the database with no parent collection.
async function deleteCollection(req, res) {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    await Image.deleteMany({ collectionId: req.params.id });

    res.status(204).send(); // 204 = "No Content" — success, nothing to return
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(500).json({ error: "Failed to delete collection" });
  }
}

module.exports = {
  getAllCollections,
  createCollection,
  getCollectionById,
  getCollectionByShareToken,
  deleteCollection,
};
