import React from "react";

export default function BookCard({ book, onDelete }) {
  const handleDeleteClick = () => {
    if (typeof onDelete === "function") {
      onDelete(book.id);
    }
  };

  return (
    <div className="card book-card">
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Rating:</strong> {book.rating}</p>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}
