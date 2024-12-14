import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, PinIcon as Pinterest, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-secondary text-primary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About HomeDecor</h3>
            <p className="text-sm">HomeDecor is your one-stop shop for all your home decoration needs. We offer a wide range of quality furniture, decor, lighting, and textiles to transform your house into a beautiful home.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/category/furniture" className="hover:text-accent transition duration-300">Furniture</Link></li>
              <li><Link to="/category/decor" className="hover:text-accent transition duration-300">Home Decor</Link></li>
              <li><Link to="/category/lighting" className="hover:text-accent transition duration-300">Lighting</Link></li>
              <li><Link to="/category/textiles" className="hover:text-accent transition duration-300">Textiles</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-accent transition duration-300">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition duration-300">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-accent transition duration-300">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-accent transition duration-300">Returns & Exchanges</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-accent transition duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-accent transition duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-accent transition duration-300">
                <Pinterest size={24} />
              </a>
              <a href="#" className="hover:text-accent transition duration-300">
                <Twitter size={24} />
              </a>
            </div>
            <h4 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h4>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow p-2 rounded-l-full focus:outline-none text-text"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-full hover:bg-accent transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} HomeDecor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

