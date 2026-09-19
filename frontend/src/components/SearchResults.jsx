// components/SearchResults.jsx
// Displays Pixabay search results as a grid of image cards, each with a
// "Save" button. Doesn't know how saving actually works — it just calls
// onSave(result) and lets the parent (CollectionView) handle the API call.

function SearchResults({ results, onSave }) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "0.75rem",
        marginBottom: "2rem",
      }}
    >
      {results.map((result) => (
        <div
          key={result.pixabayId}
          style={{ border: "1px solid #eee", borderRadius: "6px", overflow: "hidden" }}
        >
          <img
            src={result.previewUrl}
            alt={result.tags}
            style={{ width: "100%", height: "120px", objectFit: "cover", display: "block" }}
          />
          <div style={{ padding: "0.4rem" }}>
            <button onClick={() => onSave(result)} style={{ width: "100%" }}>
              Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
