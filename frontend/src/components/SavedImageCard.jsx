// components/SavedImageCard.jsx
// One saved image, with its own small bit of local state for whether
// we're currently editing its note. Kept as its own component (rather
// than inline in a map()) because it needs that extra state.

import { useState } from "react";

function SavedImageCard({ image, onUpdateNote, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [noteDraft, setNoteDraft] = useState(image.note || "");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSaveNote() {
    setIsSaving(true);
    try {
      await onUpdateNote(image._id, noteDraft);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div style={{ border: "1px solid #eee", borderRadius: "6px", overflow: "hidden" }}>
      <img
        src={image.previewUrl || image.imageUrl}
        alt={image.tags}
        style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }}
      />
      <div style={{ padding: "0.5rem" }}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              placeholder="Add a note..."
              style={{ width: "100%", marginBottom: "0.3rem", padding: "0.25rem" }}
            />
            <div style={{ display: "flex", gap: "0.3rem" }}>
              <button onClick={handleSaveNote} disabled={isSaving} style={{ flex: 1 }}>
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setIsEditing(false)} style={{ flex: 1 }}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p style={{ minHeight: "1.2em", fontSize: "0.9rem", color: "#444" }}>
              {image.note || <em style={{ color: "#999" }}>No note</em>}
            </p>
            <div style={{ display: "flex", gap: "0.3rem" }}>
              <button onClick={() => setIsEditing(true)} style={{ flex: 1 }}>
                Edit
              </button>
              <button onClick={() => onDelete(image._id)} style={{ flex: 1 }}>
                Remove
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SavedImageCard;
