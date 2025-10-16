import React, { useState, useEffect, useCallback } from "react";
import BookCard from "../components/BookCard";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(saved);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  
  const handleDelete = useCallback((id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  
  const filteredBooks = books
    .filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))
    .filter((b) => (filter === "all" ? true : b.genre === filter));

  return (
    <div className="page">
      <h2>Book List</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="fiction">Fiction</option>
          <option value="nonfiction">Nonfiction</option>
          <option value="tech">Tech</option>
        </select>
      </div>

      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onDelete={handleDelete} />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}
