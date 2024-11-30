import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UpdateBook() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get('bookId'); 

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discount: "",
    image: "",
    title: "",
    Genre:"",
  });

  


  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem("authToken"); 

        if (!token) {
          setError("Authentication token is missing");
          setLoading(false);
          return;
        }
        
        const response = await axios.get(
          `http://localhost:4000/book/book?bookId=${bookId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        setLoading(false)
        
        setFormData(response.data.book); 
      } catch (error) {
        console.error("Error fetching book details:", error);
        setErrorMessage("Failed to load book details.");
      }
    };

    fetchBookDetails();
  }, [bookId]);
  if (loading) {
    return (
      <div className="text-center mt-20">
        <p> Fetching book Detail...</p>
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
        const token = localStorage.getItem("authToken"); 

        if (!token) {
          setError("Authentication token is missing");
          setLoading(false);
          return;
        }
      const response = await axios.put(
        `http://localhost:4000/book/updatebook?bookId=${bookId}`,
        formData,
        {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
            
          }
          
      );
      setSuccessMessage("Book updated successfully!");
      navigate('/books');
      console.log(response);
      
    } catch (error) {
      setErrorMessage("Failed to update the book. Please try again.");
      console.error("Error:", error);
    }
  };

  
  return (
    <div className="max-w-screen-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white transition-shadow hover:shadow-2xl transform hover:scale-105 duration-300">
      <h1 className="text-2xl font-bold text-center text-pink-500">
        Update Book Information
      </h1>
      {errorMessage && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Book Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter book name"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
     
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
       
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter book description"
            rows="3"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      
        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter book category"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      
        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter book price"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        
        <div>
  <label htmlFor="genre" className="block text-sm font-medium">
    Genre
  </label>
  <select id="genre" name="Genre" value={formData.Genre} onChange={handleChange}>
    <option value="fiction">
      Fiction
      </option>
    <option value="comedy">
      Comedy
      </option>
    <option value="drama">
      Drama
      </option>
    <option value="horror">
      Horror
      </option>
  </select>
</div>


        <div>
          <label htmlFor="discount" className="block text-sm font-medium">
            Discount (%)
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Enter discount percentage"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
       
        <div>
          <label htmlFor="image" className="block text-sm font-medium">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-md font-medium hover:bg-pink-700 transition-all"
        >
          Update Book
        </button>
      </form>
      {successMessage && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default UpdateBook;
