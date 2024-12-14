import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { ShoppingCart } from 'lucide-react';

function CategoryPage() {
  const { categoryId } = useParams();
  const { addToCart } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      try {
        const response = await fetch(`http://localhost/projects/api/product.php?category=${categoryId}`, requestOptions);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  const categoryNames = {
    1: "Lit",
    2: "Chaises",
    3: "Luminaires",
    4: "Linge de Maison",
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="section-title">
        {categoryNames[categoryId] || `Category ${categoryId}`}
      </h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="card relative">
              <Link
                to={`/product/${product.id}`}
                className="block hover:shadow-lg transition duration-300"
              >
                <img src={product.image_url || "/placeholder.svg"} alt={product.name} className="w-full product-card-image rounded-t-lg object-contain" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-primary text-lg mb-4">${parseFloat(product.price).toFixed(2)}</p>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
                className="btn btn-primary absolute bottom-4 right-4"
              >
                <ShoppingCart size={20} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found in this category.</p>
      )}
    </div>
  );
}

export default CategoryPage;

