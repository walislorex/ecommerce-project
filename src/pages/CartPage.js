import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Trash2, Plus, Minus } from 'lucide-react';

function CartPage() {
  const { user, removeFromCart, updateQuantity, getTotalPrice } = useUser();

  const handleQuantityChange = (productId, change) => {
    const item = user.cart.find(item => item.id === productId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(productId, newQuantity);
    }
  };

  if (!user || !user.cart || user.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="section-title">Your Cart</h1>
        <p className="text-center text-gray-500">Your cart is empty.</p>
        <div className="text-center mt-8">
          <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-8" style={{marginTop:"40px"}}>
      <h1 className="section-title">Your Cart</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {user.cart.map((item) => (
          <div key={item.id} className="border-b border-gray-200 p-4 flex items-center">
            <img src={item.image_url} alt={item.name} className="w-20 h-20 object-contain rounded mr-4" />
            <div className="flex-grow">
              <h3 className="font-semibold text-lg text-primary">{item.name}</h3>
              <p className="text-gray-500">${parseFloat(item.price).toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
              >
                <Minus size={16} />
              </button>
              <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-primary">Total:</span>
          <span className="text-2xl font-bold text-primary">
            ${user.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </span>
        </div>
        <Link
          to="/checkout"
          className="btn btn-primary w-full text-center"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default CartPage;

