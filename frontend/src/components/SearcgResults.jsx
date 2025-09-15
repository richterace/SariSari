import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import getBaseUrl from "../utils/baseUrl";

const SearchResults = () => {
  const { search } = useLocation(); // gives "?q=term"
  const query = new URLSearchParams(search).get("q");

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/items/search?q=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Search Results for: "{query}"</h2>
      {results.length > 0 ? (
        <ul className="space-y-2">
          {results.map((book) => (
            <li key={book.id} className="p-4 border rounded">
              {book.title}
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
