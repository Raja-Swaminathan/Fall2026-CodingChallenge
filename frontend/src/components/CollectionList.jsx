// components/CollectionList.jsx
// Purely presentational: given an array of collections, it renders them
// as clickable links to each collection's detail page.

import { Link } from "react-router-dom";

function CollectionList({ collections }) {
  if (collections.length === 0) {
    return <p>No collections yet — create one above.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {collections.map((collection) => (
        <li
          key={collection._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "0.75rem 1rem",
            marginBottom: "0.5rem",
          }}
        >
          <Link to={`/collections/${collection._id}`} style={{ fontWeight: "bold" }}>
            {collection.name}
          </Link>
          <div style={{ fontSize: "0.85rem", color: "#666" }}>
            Share token: {collection.shareToken}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CollectionList;
