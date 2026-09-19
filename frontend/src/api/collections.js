// api/collections.js
// This file is the ONLY place that knows the backend's URL and how to
// talk to it. Components never call fetch() directly — they call these
// functions instead. If the backend URL changes, or we switch to a
// different way of storing data, this is the only file we have to touch.

const API_BASE = "http://localhost:5000/api/collections";

// Fetches every collection from the backend.
// Returns an array (possibly empty) of collection objects.
export async function getCollections() {
  const response = await fetch(API_BASE);

  if (!response.ok) {
    throw new Error("Failed to fetch collections");
  }

  return response.json();
}

// Creates a new collection with the given name.
// Returns the newly created collection object (including its _id and
// auto-generated shareToken).
export async function createCollection(name) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    // Try to read the backend's error message, e.g. "Collection name is required"
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to create collection");
  }

  return response.json();
}

// Fetches one collection by its database ID.
export async function getCollectionById(id) {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) throw new Error("Collection not found");
  return response.json();
}

// Fetches one collection by its shareToken (used for shared links).
export async function getCollectionByShareToken(token) {
  const response = await fetch(`${API_BASE}/shared/${token}`);
  if (!response.ok) throw new Error("Shared collection not found");
  return response.json();
}

// Deletes a collection (and, on the backend, all images inside it).
export async function deleteCollection(id) {
  const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete collection");
}
