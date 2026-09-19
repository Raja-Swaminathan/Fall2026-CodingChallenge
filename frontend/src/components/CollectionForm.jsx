// components/CollectionForm.jsx
// A small, focused component: its only job is to collect a name from
// the user and hand it off via the onCreate prop when submitted.
// It doesn't know or care HOW the collection gets saved — that's the
// parent component's responsibility. This separation makes it easy to
// test and reuse this form elsewhere later if needed.

import { useState } from "react";

function CollectionForm({ onCreate }) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    // Prevents the browser's default "reload the page" form behavior.
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter a name");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onCreate(name);
      setName(""); // clear the input after a successful create
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New collection name..."
        disabled={isSubmitting}
        style={{ padding: "0.5rem", marginRight: "0.5rem", minWidth: "220px" }}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Collection"}
      </button>
      {error && (
        <p style={{ color: "crimson", marginTop: "0.5rem" }}>{error}</p>
      )}
    </form>
  );
}

export default CollectionForm;
