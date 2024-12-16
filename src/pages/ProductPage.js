import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { ShoppingBag, Truck, RefreshCw, Star, Minus, Plus } from 'lucide-react';

function ProductPage() {
  const { productId } = useParams();
  const { addToCart } = useUser();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost/projects/api/single-product.php?id=${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert(`${product.name} added to cart!`);
    }
  };


  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8" style={{marginTop:"40px"}}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <img src={product.image_url} alt={product.name} className="w-full h-96 object-fill object-center rounded-lg" />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-primary font-cormorant mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600 font-montserrat">(4.0)</span>
            </div>
            <p className="text-2xl font-semibold text-primary font-cormorant mb-4">${parseFloat(product.price).toFixed(2)}</p>
            <p className="text-gray-600 font-montserrat mb-6">{product.description}</p>

            <div className="mb-6">
              <button onClick={handleAddToCart} className="bg-secondary text-primary py-3 px-6 rounded-md hover:bg-accent transition duration-300 flex items-center justify-center font-montserrat bg-emerald-400">
                <ShoppingBag className="mr-2" size={10} /> Add to Cart
              </button>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Truck size={16} className="mr-2" />
                <span className="font-montserrat">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <RefreshCw size={16} className="mr-2" />
                <span className="font-montserrat">30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

