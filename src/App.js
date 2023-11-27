import React, { useState } from "react";
import "tailwindcss/tailwind.css"; // Import the tailwind CSS file

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
    <div className="container mx-auto p-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 mr-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white rounded p-2"
      >
        Search
      </button>

      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book, index) => (
          <li key={index} className="border p-4 rounded">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="w-full h-40 object-cover mb-4"
            />
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {book.volumeInfo.title}
              </h3>
              <p className="text-gray-700 mb-2">
                Author: {book.volumeInfo.authors?.join(", ")}
              </p>
              <p className="text-green-500">
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
