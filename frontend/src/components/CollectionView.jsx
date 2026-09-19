// components/CollectionView.jsx
// This is the shared core of both the collection detail page and the
// shared-link page — both cases boil down to "here is a collection,
// let the user search, save, edit, and remove images in it."

import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import SavedImages from "./SavedImages";
import {
  getImagesForCollection,
  addImageToCollection,
  updateImageNote,
  deleteImage,
  searchImages,
} from "../api/images";

function CollectionView({ collection }) {
  const [images, setImages] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getImagesForCollection(collection._id)
      .then((data) => setImages(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoadingImages(false));
  }, [collection._id]);

  async function handleSearch(query) {
    try {
      const results = await searchImages(query);
      setSearchResults(results);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSaveImage(result) {
    try {
      const saved = await addImageToCollection(collection._id, result);
      setImages((prev) => [saved, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdateNote(imageId, note) {
    const updated = await updateImageNote(imageId, note);
    setImages((prev) => prev.map((img) => (img._id === imageId ? updated : img)));
  }

  async function handleDeleteImage(imageId) {
    await deleteImage(imageId);
    setImages((prev) => prev.filter((img) => img._id !== imageId));
  }

  const shareUrl = `${window.location.origin}/shared/${collection.shareToken}`;

  return (
    <div>
      <h2>{collection.name}</h2>

      <div
        style={{
          background: "#f5f5f5",
          padding: "0.6rem",
          borderRadius: "6px",
          marginBottom: "1rem",
          fontSize: "0.85rem",
        }}
      >
        Share link: <code>{shareUrl}</code>{" "}
        <button onClick={() => navigator.clipboard.writeText(shareUrl)}>Copy</button>
      </div>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <h3>Search for images</h3>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} onSave={handleSaveImage} />

      <h3>Saved in this collection</h3>
      {isLoadingImages ? (
        <p>Loading...</p>
      ) : (
        <SavedImages
          images={images}
          onUpdateNote={handleUpdateNote}
          onDelete={handleDeleteImage}
        />
      )}
    </div>
  );
}

export default CollectionView;
