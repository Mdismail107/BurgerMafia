import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/Common/SEO';
import BlogCard from '../components/Cards/BlogCard';
import { blogAPI } from '../services/api';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await blogAPI.getAll();
        setBlogPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <>
      <SEO
        title="Blog & Stories"
        description="Read the latest stories, recipes, and insights from BurgerMafia's culinary experts."
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
              Blog & <span className="text-yellow-400">Stories</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Discover the latest stories, recipes, and insights from our culinary experts
            </motion.p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center text-yellow-400 text-xl">Loading blog posts...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            )}
            
            {!loading && blogPosts.length === 0 && (
              <div className="text-center text-gray-400 text-xl">
                No blog posts available at the moment.
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;