// pages/HomePage.jsx
import { useState, useEffect } from "react";
import CollectionForm from "../components/CollectionForm";
import CollectionList from "../components/CollectionList";
import { getCollections, createCollection } from "../api/collections";

function HomePage() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    getCollections()
      .then((data) => setCollections(data))
      .catch((err) => setLoadError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleCreate(name) {
    const newCollection = await createCollection(name);
    setCollections((prev) => [newCollection, ...prev]);
  }

  return (
    <div>
      <h1>My Collections</h1>
      <CollectionForm onCreate={handleCreate} />
      {isLoading && <p>Loading collections...</p>}
      {loadError && <p style={{ color: "crimson" }}>Error: {loadError}</p>}
      {!isLoading && !loadError && <CollectionList collections={collections} />}
    </div>
  );
}

export default HomePage;
