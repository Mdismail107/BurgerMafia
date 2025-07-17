import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/Common/SEO';
import MenuCard from '../components/Cards/MenuCard';
import { menuAPI } from '../services/api';
import { MenuItem } from '../types';

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await menuAPI.getAll();
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <SEO
        title="Gourmet Burger Menu"
        description="Explore our premium gourmet burger menu featuring the finest ingredients and bold flavors."
      />
      
      <div className="min-h-screen bg-black pt-16">
        {/* Header */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              Our <span className="text-yellow-400">Menu</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Premium gourmet burgers crafted with the finest ingredients
            </motion.p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {category === 'all' ? 'All Items' : category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Menu Items */}
        <section className="py-12 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center text-yellow-400 text-xl">Loading menu...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => (
                  <MenuCard key={item.id} item={item} index={index} />
                ))}
              </div>
            )}
            
            {!loading && filteredItems.length === 0 && (
              <div className="text-center text-gray-400 text-xl">
                No items found in this category.
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Menu;