import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [bookData, setBookData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    discount: '',
    image: '',
    title: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        'http://localhost:4000/book/addbook',
        bookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Book added successfully:', res.data);
      navigate('/books');
    } catch (err) {
      console.error('Error adding book:', err);
      if (err.response) {
        setError(err.response.data.message || 'Failed to add book');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto my-12 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white rounded-lg shadow-xl transition-shadow hover:shadow-2xl transform hover:scale-105 duration-300">
      <h2 className="text-3xl mt-10 font-extrabold text-center text-pink-500 mb-6">
        Add New Book
      </h2>
      {error && (
        <p className="text-red-500 text-center mb-4 animate-pulse">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block text-lg font-medium text-gray-700 transition-all hover:text-pink-500"
            htmlFor="name"
          >
            Book Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={bookData.name}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label
            className="block text-lg font-medium text-gray-700 transition-all hover:text-pink-500"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label
            className="block text-lg font-medium text-gray-700 transition-all hover:text-pink-500 "
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={bookData.description}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            rows="4"
            required
          />
        </div>

        <div>
          <label
            className="block text-lg font-medium text-gray-700 transition-all hover:text-pink-500"
            htmlFor="category"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={bookData.category}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label
            className="block text-lg font-medium text-gray-700 transition-all hover:text-pink-500"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={bookData.price}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label
            className="block text-lg font-medium text-gray-700 transition-all hover:text-pink-500"
            htmlFor="discount"
          >
            Discount
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={bookData.discount}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div>
          <label
            className="block text-lg font-medium text-gray-700 transition-all hover:text-pink-500"
            htmlFor="image"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={bookData.image}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full py-3 text-white rounded-md font-medium transition-all duration-300 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-pink-500 hover:bg-pink-700 shadow-md hover:shadow-xl transform hover:scale-105'
            }`}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
