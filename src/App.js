import React, { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
      .then((response) => response.json())
      .then((data) => {
        const arrayOfBooks = data.items || [];
        setBooks(arrayOfBooks);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          handleSearch(value);
        }}
      />

      <button>Search</button>

      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              style={{ width: "100px", height: "100px" }}
            />
            <div>
              <h3>{book.volumeInfo.title}</h3>
              <p>Author: {book.volumeInfo.authors?.join(", ")}</p>
              <p>
                Price: {book.saleInfo.listPrice?.amount}{" "}
                {book.saleInfo.listPrice?.currencyCode}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
