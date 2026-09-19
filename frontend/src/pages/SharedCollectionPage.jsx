// pages/SharedCollectionPage.jsx
// Reached via /shared/:token — anyone with this link can view and
// collaborate on the collection (add/edit/remove images), but NOT
// delete the whole collection. That action is intentionally only
// available from CollectionDetailPage, so a shared link can't be used
// to destroy someone's entire collection.

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CollectionView from "../components/CollectionView";
import { getCollectionByShareToken } from "../api/collections";

function SharedCollectionPage() {
  const { token } = useParams();
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCollectionByShareToken(token)
      .then((data) => setCollection(data))
      .catch((err) => setError(err.message));
  }, [token]);

  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!collection) return <p>Loading...</p>;

  return (
    <div>
      <p style={{ fontStyle: "italic", color: "#666" }}>
        You're viewing a shared collection. Anyone with this link can edit it.
      </p>
      <CollectionView collection={collection} />
    </div>
  );
}

export default SharedCollectionPage;
