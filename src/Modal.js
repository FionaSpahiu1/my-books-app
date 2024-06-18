import React from 'react';

function Modal({ isOpen, onClose, handleSubmit, handleInputChange, newBook }) {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Add New Book</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <label>Genre: <input type="text" name="Genre" value={newBook.Genre} onChange={handleInputChange} required /></label>
            <label>Title: <input type="text" name="Title" value={newBook.Title} onChange={handleInputChange} required /></label>
            <label>Author: <input type="text" name="Author" value={newBook.Author} onChange={handleInputChange} required /></label>
            <label>Year: <input type="text" name="Year" value={newBook.Year} onChange={handleInputChange} required /></label>
            <label>Annotation: <input type="text" name="Annotation" value={newBook.Annotation} onChange={handleInputChange} required /></label>
            <label>Rating: <input type="text" name="Rating" value={newBook.Rating} onChange={handleInputChange} required /></label>
          </div>
          <div className="modal-footer">
            <button type="submit">Add Book</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;