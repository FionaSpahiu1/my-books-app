import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Modal from './Modal';

function App() {
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({ Title: '', Author: '', Year: '', Rating: '' });

  // Function to handle input change in modal form
  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  // Function to submit new book details
  const handleSubmit = (e) => {
    e.preventDefault();
    setBooks([...books, newBook]);
    setNewBook({ Title: '', Author: '', Year: '', Rating: '' });
    setModalOpen(false);
  };

  // Load books from CSV on component mount
  useEffect(() => {
    fetch('/books.csv')
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setBooks(results.data);
          }
        });
      });
  }, []);

  return (
    <div className="App">
      <h1>My Book List</h1>
      <button onClick={() => setModalOpen(true)}>Add New Book</button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label>Title: <input type="text" name="Title" value={newBook.Title} onChange={handleInputChange} required /></label>
          <label>Author: <input type="text" name="Author" value={newBook.Author} onChange={handleInputChange} required /></label>
          <label>Year: <input type="text" name="Year" value={newBook.Year} onChange={handleInputChange} required /></label>
          <label>Rating: <input type="text" name="Rating" value={newBook.Rating} onChange={handleInputChange} required /></label>
          <button type="submit">Add Book</button>
        </form>
      </Modal>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.Title}</td>
              <td>{book.Author}</td>
              <td>{book.Year}</td>
              <td>{book.Rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
