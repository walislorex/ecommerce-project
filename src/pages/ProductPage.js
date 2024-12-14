import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { ShoppingCart } from 'lucide-react';

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
      alert("Product added to cart!");
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 mt-8">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8 mt-8">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8" style={{marginTop:"40px"}}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-accent font-semibold">{product.category}</div>
            <h1 className="mt-1 text-4xl font-bold text-primary">{product.name}</h1>
            <p className="mt-2 text-gray-500">{product.description}</p>
            <div className="mt-4">
              <span className="text-3xl font-bold text-primary">${parseFloat(product.price).toFixed(2)}</span>
            </div>
            <div className="mt-6">
              <button onClick={handleAddToCart} className="btn btn-primary flex items-center " style={{width:"190px"}}>
                <ShoppingCart className="mr-2" /> Add to Cart
              </button>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Product Details</h2>
              <ul className="list-disc list-inside">
                <li>Material: {product.material || 'Not specified'}</li>
                <li>Dimensions: {product.dimensions || 'Not specified'}</li>
                <li>Color: {product.color || 'Not specified'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

