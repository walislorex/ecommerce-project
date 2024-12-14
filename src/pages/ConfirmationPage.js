


import React from 'react';
import { Link } from 'react-router-dom';

function ConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-8" style={{marginTop:"40px"}}>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-primary">Order Confirmed!</h1>
        <p className="mb-8 text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        <p className="mb-8 text-gray-600">An email confirmation has been sent to your registered email address.</p>
        <Link 
          to="/" 
          className="bg-secondary text-white px-6 py-3 rounded-full hover:bg-primary transition duration-300 inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default ConfirmationPage;

