// pages/CollectionDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CollectionView from "../components/CollectionView";
import { getCollectionById, deleteCollection } from "../api/collections";

function CollectionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCollectionById(id)
      .then((data) => setCollection(data))
      .catch((err) => setError(err.message));
  }, [id]);

  async function handleDeleteCollection() {
    const confirmed = window.confirm(
      `Delete "${collection.name}" and everything in it? This can't be undone.`
    );
    if (!confirmed) return;

    await deleteCollection(id);
    navigate("/");
  }

  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!collection) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/">&larr; Back to all collections</Link>
      <CollectionView collection={collection} />
      <button onClick={handleDeleteCollection} style={{ marginTop: "1rem", color: "crimson" }}>
        Delete this collection
      </button>
    </div>
  );
}

export default CollectionDetailPage;
