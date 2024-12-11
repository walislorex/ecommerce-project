import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loadUserData = () => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) {
        setUser(savedUser);
      }
    };

    loadUserData();
  }, [user]);
  const { cart } = useCart();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          EcomStore
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/category/electronics">Electronics</Link>
          </li>
          <li>
            <Link to="/category/clothing">Clothing</Link>
          </li>
          <li>
            <Link to="/cart">Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("user"); // Remove the user data from localStorage
                  setUser(null); // Clear the state
                  alert("You have logged out!");
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
