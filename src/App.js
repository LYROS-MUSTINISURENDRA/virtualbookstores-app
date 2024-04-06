import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch initial book data when component mounts
    fetchBooks('harry+potter');
    fetchBooks('sherlock+holmes');
  }, []);

  const fetchBooks = async (query) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setBooks(prevBooks => [...prevBooks, ...data.items]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      setBooks([]); // Clear previous search results
      await fetchBooks(searchQuery);
    }
  };

  const handleBookClick = (book) => {
    // Handle book click - expand book banner, etc.
    console.log('Book clicked:', book);
  };

  return (
    <div className="App">
      <header>
        <h1>Virtual Bookstore</h1>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search for books..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
      <main>
        <div className="book-grid">
          {books.map(book => (
            <div key={book.id} className="book" onClick={() => handleBookClick(book)}>
              <img src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'} alt={book.volumeInfo.title} />
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;