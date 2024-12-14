import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { ShoppingCart } from 'lucide-react';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");
  const { addToCart } = useUser();

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost/projects/api/product.php?search=${encodeURIComponent(searchQuery)}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{marginTop:"40px"}}>
      <h1 className="section-title">Search Results for "{searchQuery}"</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((product) => (
            <div key={product.id} className="card relative">
              <Link
                to={`/product/${product.id}`}
                className="block hover:shadow-lg transition duration-300"
              >
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="w-full h-64 object-contain rounded-t-lg" 
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{product.name}</h3>
                  <p className="text-gray-600 mb-4">${parseFloat(product.price)}</p>
                </div>
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="btn btn-primary absolute bottom-4 right-4"
              >
                <ShoppingCart size={20} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No results found for "{searchQuery}"</p>
      )}
    </div>
  );
}

export default SearchPage;

