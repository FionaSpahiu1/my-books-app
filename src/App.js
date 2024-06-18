import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import "./App.css";
function App() {
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({ ImageUrl:'', Genre: '', Title: '', Author: '', Year: '', Annotation: '', Rating: '' });

  // Fetch books from the server on component mount
  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    })
    .then(response => {
      if (response.ok) {
        setBooks([...books, newBook]);  // Update UI optimistically
        setNewBook({ ImageUrl: '', Genre: '', Title: '', Author: '', Year: '',Annotation: '', Rating: '' });
        setModalOpen(false);
      }
    })
    .catch(error => console.error('Error adding book:', error));
  };
  const renderRating = (rating) => {
    let stars = [];
    for (let i = 0; i < parseInt(rating); i++) {
      stars.push(<span key={i}>&#9733;</span>); // Star character
    }
    return stars;
  };
  return (
    <div className="App">
      <h1>My Book List</h1>
      <button onClick={() => setModalOpen(true)}>Add New Book</button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} handleSubmit={handleSubmit} handleInputChange={handleInputChange} newBook={newBook} />
      <div className="book-list">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <div className='book-image'>
              <img src={book.ImageUrl} alt={`Cover of ${book.Title}`} />
            </div>
            <div className='book-details'>
              <h2>{book.Title} <span className="rating">{renderRating(book.Rating)}</span> </h2>
              <p><b>Genre:</b> {book.Genre}</p>
              <p><b>Author:</b> {book.Author}</p>
              <p><b>Year:</b> {book.Year}</p>
              <p><b>Annotation:</b> {book.Annotation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
