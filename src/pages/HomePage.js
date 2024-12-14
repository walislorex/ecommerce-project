import { useState, useEffect } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from 'lucide-react';

function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const req = await fetch("http://localhost/projects/api/products.php");
        const data = await req.json();
        setProducts(data); // Limit to 6 featured products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { id: "1", name: "Lit", icon: "🛏️" },
    { id: "2", name: "Chaises", icon: "🪑" },
    { id: "3", name: "Luminaires", icon: "💡" },
    { id: "4", name: "Linge de Maison", icon: "🧵" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="hero bg-secondary text-text py-6 mt-5 px-4 rounded-lg mb-3">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Transform Your Space</h1>
          <p className="text-xl mb-8">Discover beautiful products to elevate your home's ambiance</p>
          
        </div>
      </section>

      <section className="featured-products mb-12">
        <h2 className="section-title">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="card block hover:shadow-lg transition duration-300"
            >
              <img src={`.${product.image_url}`} alt={product.name} className="w-full h-64 object-contain rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-primary text-lg mb-4">${parseFloat(product.price).toFixed(2)}</p>
                <button className="btn btn-secondary w-full">
                  View Product
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>



      <section className="cta bg-primary text-black py-10 px-4 rounded-lg">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Redesign Your Home?</h2>
          <p className="text-xl">Get inspired with our curated collections and expert tips</p>
          
        </div>
      </section>
      <section className="categories mb-12">
        <h2 className="section-title">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`} className="card p-6 text-center hover:bg-secondary transition duration-300">
              <span className="text-4xl mb-2 block">{category.icon}</span>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;

