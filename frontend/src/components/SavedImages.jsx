// components/SavedImages.jsx
import SavedImageCard from "./SavedImageCard";

function SavedImages({ images, onUpdateNote, onDelete }) {
  if (images.length === 0) {
    return <p>No images saved yet — search above and click Save.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "0.75rem",
      }}
    >
      {images.map((image) => (
        <SavedImageCard
          key={image._id}
          image={image}
          onUpdateNote={onUpdateNote}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default SavedImages;
