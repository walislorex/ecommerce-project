import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductPage() {
  const { productId } = useParams();
  const { addToCart } = useCart();

  // This would typically come from an API
  const product = {
    id: parseInt(productId),
    name: `Product ${productId}`,
    price: 19.99 * parseInt(productId),
    image: '/placeholder.svg',
    description: 'This is a sample product description. It would typically contain detailed information about the product.',
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert('Product added to cart!');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-auto" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

