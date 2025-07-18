import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/Common/SEO';
import Navbar from '../components/Layout/Navbar';
import HeroSection from '../components/Home/HeroSection';
import MenuCard from '../components/Cards/MenuCard';
import BlogCard from '../components/Cards/BlogCard';
import { menuAPI, blogAPI } from '../services/api';
import { MenuItem, BlogPost } from '../types';
import { Helmet } from 'react-helmet-async';


const MAX_WIDTH = 'max-w-7xl';
const SECTION_PADDING = 'py-20';
const CONTAINER_PADDING = 'px-4 sm:px-6 lg:px-8';

interface HomeState {
  featuredItems: MenuItem[];
  featuredPosts: BlogPost[];
  loading: boolean;
  error: string | null;
}

const Home: React.FC = () => {
  const [state, setState] = useState<HomeState>({
    featuredItems: [],
    featuredPosts: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [menuResponse, blogResponse] = await Promise.all([
          menuAPI.getAll({ signal: controller.signal }),
          blogAPI.getAll({ signal: controller.signal })
        ]);

        if (isMounted) {
          setState({
            featuredItems: extractData<MenuItem>(menuResponse.data)
              .map(item => ({ ...item, id: String(item.id) }))
              .slice(0, 3),
            featuredPosts: extractData<BlogPost>(blogResponse.data)
              .map(post => ({
                ...post,
                id: String(post.id),
                author: typeof post.author === 'object' ? post.author.username : post.author
              }))
              .slice(0, 3),
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (isMounted && !controller.signal.aborted) {
          console.error('Error fetching data:', err);
          setState(prev => ({
            ...prev,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load data',
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const extractData = <T,>(data: any): T[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    return data.results || data.items || data.menu || data.posts || data.blogs || [];
  };

  const { featuredItems, featuredPosts, loading, error } = state;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" aria-live="polite">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto" />
          <p className="mt-4 text-lg">Loading delicious content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" aria-live="polite">
        <div className="text-center p-8 bg-red-100 rounded-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Content</h2>
          <p className="text-red-800 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <Helmet>
        <title>BurgerMafia | Home</title>
        <meta name="description" content="Best gourmet burgers in town." />
      </Helmet>

      <Navbar /> {/* ✅ added navbar */}
      <SEO
        title="Premium Gourmet Burgers"
        description="Experience the finest handcrafted burgers made with premium ingredients."
      />
      <HeroSection />
      <FeaturedMenuSection items={featuredItems} />
      <FeaturedBlogSection posts={featuredPosts} />
      <CTASection />
    </>
  );
};

// ─────────────────────────────────────
// Sub-components
// ─────────────────────────────────────

interface FeaturedMenuSectionProps {
  items: MenuItem[];
}

const FeaturedMenuSection: React.FC<FeaturedMenuSectionProps> = ({ items }) => (
  <section className={`${SECTION_PADDING} bg-gray-900`} aria-labelledby="featured-menu-heading">
    <div className={`${MAX_WIDTH} mx-auto ${CONTAINER_PADDING}`}>
      <SectionHeader
        id="featured-menu-heading"
        title="Featured Menu"
        highlight="Menu"
        description="Discover our most popular gourmet burgers"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {items.map((item, index) => (
          <MenuCard key={item.id} item={item} index={index} />
        ))}
      </div>
      <ViewAllButton to="/menu" text="View Full Menu" />
    </div>
  </section>
);

interface FeaturedBlogSectionProps {
  posts: BlogPost[];
}

const FeaturedBlogSection: React.FC<FeaturedBlogSectionProps> = ({ posts }) => (
  <section className={`${SECTION_PADDING} bg-black`} aria-labelledby="featured-blog-heading">
    <div className={`${MAX_WIDTH} mx-auto ${CONTAINER_PADDING}`}>
      <SectionHeader
        id="featured-blog-heading"
        title="Latest Stories"
        highlight="Stories"
        description="Stay updated with our latest news"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {posts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>
      <ViewAllButton to="/blog" text="Read All Stories" delay={0.4} />
    </div>
  </section>
);

const CTASection: React.FC = () => (
  <section className={`${SECTION_PADDING} bg-yellow-400`}>
    <div className={`${MAX_WIDTH} mx-auto ${CONTAINER_PADDING} text-center`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Ready to Experience the Best?
        </h2>
        <Link
          to="/contact"
          className="bg-black text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-900 transition-colors inline-block"
        >
          Get in Touch
        </Link>
      </motion.div>
    </div>
  </section>
);

interface SectionHeaderProps {
  id: string;
  title: string;
  highlight: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ id, title, highlight, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <h2 id={id} className="text-4xl md:text-5xl font-bold text-white mb-4">
      {title.split(' ')[0]} <span className="text-yellow-400">{highlight}</span>
    </h2>
    <p className="text-xl text-gray-400 max-w-2xl mx-auto">{description}</p>
  </motion.div>
);

interface ViewAllButtonProps {
  to: string;
  text: string;
  delay?: number;
}

const ViewAllButton: React.FC<ViewAllButtonProps> = ({ to, text, delay = 0.3 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="text-center"
  >
    <Link
      to={to}
      className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors inline-block"
    >
      {text}
    </Link>
  </motion.div>
);

// PropTypes
FeaturedMenuSection.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      is_available: PropTypes.bool.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

FeaturedBlogSection.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      image: PropTypes.string,
      created_at: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  ).isRequired,
};

SectionHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

ViewAllButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

export default Home;
