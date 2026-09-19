// components/SearchBar.jsx
// A simple controlled input + button. Like CollectionForm, it doesn't
// know HOW the search happens — it just calls onSearch with whatever
// the user typed, and lets the parent component handle the rest.

import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      await onSearch(query);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images (e.g. mountains, coffee, dogs)..."
        style={{ padding: "0.5rem", marginRight: "0.5rem", minWidth: "280px" }}
      />
      <button type="submit" disabled={isSearching}>
        {isSearching ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;
