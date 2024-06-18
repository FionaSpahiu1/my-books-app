import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/books.csv')
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
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
      <table>
        <thead>
          {books.length > 0 && (
            <tr>
              {Object.keys(books[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              {Object.values(book).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
