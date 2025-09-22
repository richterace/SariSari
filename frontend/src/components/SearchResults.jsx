import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import getBaseUrl from "../utils/baseUrl";

const SearchResults = () => {
  const { search } = useLocation(); // gives "?q=term"
  const query = new URLSearchParams(search).get("q");

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null); // To handle errors

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

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Search Results for: "{query}"</h2>
      {error && <p className="text-red-500">{error}</p>}
      {results.length > 0 ? (
        <ul className="space-y-2">
          {results.map((item) => (
            <li key={item._id} className="p-4 border rounded">
              {item.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
