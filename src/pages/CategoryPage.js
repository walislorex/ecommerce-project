import React from 'react';
import { useParams, Link } from 'react-router-dom';

function CategoryPage() {
  const { categoryId } = useParams();

  // This would typically come from an API
  const products = [
    { id: 1, name: 'Product 1', price: 19.99, image: '/placeholder.svg', category: 'electronics' },
    { id: 2, name: 'Product 2', price: 29.99, image: '/placeholder.svg', category: 'electronics' },
    { id: 3, name: 'Product 3', price: 39.99, image: '/placeholder.svg', category: 'clothing' },
    { id: 4, name: 'Product 4', price: 49.99, image: '/placeholder.svg', category: 'clothing' },
  ];

  const filteredProducts = categoryId === 'all'
    ? products
    : products.filter(product => product.category === categoryId);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">
        {categoryId === 'all' ? 'All Products' : `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Products`}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
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
    </div>
  );
}

export default CategoryPage;

