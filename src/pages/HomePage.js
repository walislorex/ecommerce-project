import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const featuredProducts = [
    { id: 1, name: "Product 1", price: 19.99, image: "/placeholder.svg" },
    { id: 2, name: "Product 2", price: 29.99, image: "/placeholder.svg" },
    { id: 3, name: "Product 3", price: 39.99, image: "/placeholder.svg" },
  ];

  const categories = [
    { id: "electronics", name: "Electronics" },
    { id: "clothing", name: "Clothing" },
  ];

  return (
    <div className="container mx-auto px-4">
      <section className="hero bg-gray-100 py-16 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to EcomStore</h1>
          <p className="text-xl mb-8">Find the best products at the best prices</p>
          <Link to="/category/all" className="bg-blue-500 text-white px-6 py-2 rounded-full">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="featured-products mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="categories">
        <h2 className="text-2xl font-bold mb-4">Our Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="bg-gray-200 p-8 rounded text-center hover:bg-gray-300 transition duration-300"
            >
              <h3 className="text-xl font-bold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
