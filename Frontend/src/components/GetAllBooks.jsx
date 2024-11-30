import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function GetAllBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication token is missing");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get("http://localhost:4000/book/getallbooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(res.data.books || []);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentication token is missing");
        setLoading(false);
        return;
      }
      const response = await axios.delete(
        `http://localhost:4000/book/deleteBook?bookId=${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchBooks();
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20">
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <p>{error}</p>
      </div>
    );
  }

  const handleUpdate = (bookId) => {
    navigate(`/updatebook?bookId=${bookId}`);
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-26 text-center">
          <h1 className="text-2xl md:text-4xl">
            Explore Our <span className="text-pink-500">Book Collection</span>
          </h1>
          <p className="mt-12 text-green-500">
            Dive into a wide range of books you added. Your adventure or
            knowledge source here!
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.bookId}
              className="border rounded-lg shadow-md p-4 flex flex-col items-center text-center"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-contain rounded-md"
              />

              <h2 className="text-lg font-bold mt-4">{book.name}</h2>
              <p className="text-gray-600">{book.category}</p>
              <p className="mt-2 text-sm text-gray-500">{book.description}</p>
              <p className="mt-2 text-pink-500 font-bold">
                ${book.price ? parseFloat(book.price).toFixed(2) : "N/A"}
              </p>
              {book.discount && (
                <p className="text-green-500 text-sm">
                  Discount: {book.discount}%
                </p>
              )}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleDelete(book.bookId)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-800"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(book.bookId)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-800"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Link to="/">
            <button className="bg-pink-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-pink-800">
              Back
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default GetAllBooks;
