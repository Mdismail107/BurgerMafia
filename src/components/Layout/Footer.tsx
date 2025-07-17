import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-yellow-400">🍔</span>
              <span className="text-xl font-bold">BurgerMafia</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Premium gourmet burgers crafted with the finest ingredients. 
              Experience the taste that rules the streets.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Twitter
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Burger Street</li>
              <li>Food City, FC 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@burgermafia.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 BurgerMafia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;