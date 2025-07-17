import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MenuItem } from '../../types';

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
    >
      <div className="relative">
        <img
          src={item.image || 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
            ${item.price}
          </span>
        </div>
        {!item.is_available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Sold Out</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
            {item.name}
          </h3>
          <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">
            {item.category}
          </span>
        </div>
        
        <p className="text-gray-400 mb-4 leading-relaxed">
          {item.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-yellow-400">
            ${item.price}
          </span>
          
          <Link
            to={`/menu/${item.slug}`}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;