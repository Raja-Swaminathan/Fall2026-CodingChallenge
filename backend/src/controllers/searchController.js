// searchController.js
// Calls the Pixabay API on the SERVER, not the browser. This matters:
// if the frontend called Pixabay directly, our secret API key would be
// visible to anyone who opens their browser's dev tools. By routing the
// request through our own backend, the key stays hidden in .env.

// Node 18+ has a built-in global fetch(), so no extra package is needed.

async function searchImages(req, res) {
  try {
    const query = req.query.q;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Search query 'q' is required" });
    }

    const apiKey = process.env.PIXABAY_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "PIXABAY_API_KEY is not configured on the server" });
    }

    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
      query
    )}&image_type=photo&per_page=20`;

    const pixabayResponse = await fetch(url);

    if (!pixabayResponse.ok) {
      throw new Error(`Pixabay responded with status ${pixabayResponse.status}`);
    }

    const data = await pixabayResponse.json();

    // We trim Pixabay's response down to just the fields our frontend
    // actually needs, rather than forwarding their whole payload as-is.
    const results = data.hits.map((hit) => ({
      pixabayId: hit.id,
      imageUrl: hit.largeImageURL,
      previewUrl: hit.previewURL,
      tags: hit.tags,
    }));

    res.json(results);
  } catch (error) {
    console.error("Error searching Pixabay:", error);
    res.status(500).json({ error: "Failed to search images" });
  }
}

module.exports = { searchImages };
