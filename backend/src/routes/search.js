// routes/search.js
const express = require("express");
const router = express.Router();
const { searchImages } = require("../controllers/searchController");

// GET /api/search?q=sunset
router.get("/", searchImages);

module.exports = router;
