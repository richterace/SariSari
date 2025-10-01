import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import getBaseUrl from "../utils/baseUrl";
import { getBookData } from "../utils/getItemData";
import { useDispatch } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { addToCart } from "../redux/features/cart/cartSlice";

import { Link } from "react-router-dom";

const SearchResults = () => {
  const { search } = useLocation(); // gives "?q=term"
  const query = new URLSearchParams(search).get("q");

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null); // To handle errors
  const dispatch = useDispatch();

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        console.log(`Fetching results for query: ${query}`); // Debugging log
        const response = await axios.get(`${getBaseUrl()}/api/items/search?q=${query}`);
        setResults(response.data);
        setError(null); // Clear previous errors on success
      } catch (error) {
        console.error("Search error:", error);
        setError("There was an error fetching the search results.");
      }
    };

    fetchResults();
  }, [query]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item))
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Search Results for: "{query}"</h2>

      {error && <p className="text-red-500">{error}</p>}

      {results.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((item) => (
            <div key={item._id} className="shadow-md p-5 rounded-md border flex flex-col">
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <Link to={`/items/${item._id}`} className="hover:underline">
                <img
                  src={getBookData(item.coverImage)}
                  alt={item.title}
                  className="mb-4 w-full h-48 object-cover rounded"
                />
              </Link>

              <div className="flex-1">
                {/* <p className="text-gray-700 mb-1"><strong>Author:</strong> {item.author || "admin"}</p> */}
                <p className="text-gray-700 mb-1">
                  <strong>Price:</strong> 
                  <span className="new-text-gray-700"> ₱{item.newPrice}</span>
                </p>
                <p className="text-gray-700 mb-1"><strong>Category:</strong>  {item.category}</p>
                {/* <p className="text-gray-700 mb-1">
                
                  <strong>Published:</strong> {new Date(item.createdAt).toLocaleDateString()}
                </p> */}
                <p className="text-gray-700 mb-1"> <strong>Description: </strong>{item.description?.slice(0, 100)}</p>
              </div>
              <button
                onClick={() => handleAddToCart(item)}
                className="btn-primary mt-4 flex items-center gap-2 justify-center"
              >
                <FiShoppingCart />
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
