import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';



function Navbar() {
  const { user, logout, getCartItemsCount } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const cartItemCount = getCartItemsCount();

  return (
    <nav className="bg-white shadow-md py-1">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            HomeDecor
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-text hover:text-primary">Home</Link>
            <Link to="/category/1" className="text-text hover:text-primary">Lit</Link>
            <Link to="/category/2" className="text-text hover:text-primary">Chaises</Link>
            <Link to="/category/3" className="text-text hover:text-primary">Luminaires</Link>
            <Link to="/category/4" className="text-text hover:text-primary">Linge de Maison</Link>
          </div>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </form>
            <Link to="/cart" className="text-text hover:text-primary">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {user ? (
              <button
                onClick={logout}
                className="text-text hover:text-primary"
              >
      <FontAwesomeIcon icon={faRightFromBracket} size="lg" />

              </button>
            ) : (
              <Link to="/login" className="text-text hover:text-primary">
                <User size={24} />
              </Link>
            )}
            <button
              className="md:hidden text-text hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <Link to="/" className="block py-2 text-text hover:text-primary">Home</Link>
            <Link to="/category/1" className="block py-2 text-text hover:text-primary">Lit</Link>
            <Link to="/category/2" className="block py-2 text-text hover:text-primary">Chaises</Link>
            <Link to="/category/3" className="block py-2 text-text hover:text-primary">Luminaires</Link>
            <Link to="/category/4" className="block py-2 text-text hover:text-primary">Linge de Maison</Link>
            <form onSubmit={handleSearch} className="mt-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

