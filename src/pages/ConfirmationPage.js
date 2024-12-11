import React from 'react';
import { Link } from 'react-router-dom';

function ConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="mb-8">Thank you for your purchase. Your order has been successfully placed.</p>
        <p className="mb-4">An email confirmation has been sent to your registered email address.</p>
        <Link 
          to="/" 
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default ConfirmationPage;

