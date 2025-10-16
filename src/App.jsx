import React from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";

export default function App() {
    return(
        <div className="app">
            <header className="header">
                <nav>
                    <NavLink to="/books" className="nav">Books</NavLink>
                    <NavLink to="/add-book" className="nav">Add Book</NavLink>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Navigate to="/books" replace />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/add-book" element={<AddBook />} />
                    <Route path="*" element={<h2>404: Page Not Found</h2>} />
                </Routes>
            </main>
        </div>
    )
}