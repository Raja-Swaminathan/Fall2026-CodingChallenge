// api/images.js
// Talks to the backend's image-related endpoints. Kept separate from
// collections.js since images and collections are different resources,
// even though images live inside collections.

const API_BASE = "http://localhost:5000/api";

// Fetches every image saved inside one collection.
export async function getImagesForCollection(collectionId) {
  const response = await fetch(`${API_BASE}/collections/${collectionId}/images`);
  if (!response.ok) throw new Error("Failed to fetch images");
  return response.json();
}

// Saves a new image (typically picked from search results) into a collection.
// imageData looks like: { imageUrl, previewUrl, tags, pixabayId }
export async function addImageToCollection(collectionId, imageData) {
  const response = await fetch(`${API_BASE}/collections/${collectionId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(imageData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to save image");
  }
  return response.json();
}

// Updates an image's note/caption — this is the "edit" part of
// "save/edit content in their collections."
export async function updateImageNote(imageId, note) {
  const response = await fetch(`${API_BASE}/images/${imageId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note }),
  });
  if (!response.ok) throw new Error("Failed to update image");
  return response.json();
}

// Removes one image from its collection.
export async function deleteImage(imageId) {
  const response = await fetch(`${API_BASE}/images/${imageId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete image");
}

// Searches Pixabay via our own backend (which holds the real API key).
export async function searchImages(query) {
  const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Search failed");
  }
  return response.json();
}
