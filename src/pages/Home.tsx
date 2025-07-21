import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/Common/SEO';
import Navbar from '../components/Layout/Navbar';
import HeroSection from '../components/Home/HeroSection';
import MenuCard from '../components/Cards/MenuCard';
import BlogCard from '../components/Cards/BlogCard';
import { MenuItem, BlogPost } from '../components/types';
import { Helmet } from 'react-helmet-async';

const MAX_WIDTH = 'max-w-7xl';
const SECTION_PADDING = 'py-20';
const CONTAINER_PADDING = 'px-4 sm:px-6 lg:px-8';

// Static data for featured menu items
const FEATURED_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Mafia Boss Burger',
    slug: 'mafia-boss-burger',
    description: 'Our signature double beef patty with special sauce, aged cheddar, crispy bacon, and fresh lettuce on a brioche bun.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
    is_available: true,
    category: 'Signature'
  },
  {
    id: '2',
    name: 'Godfather Supreme',
    slug: 'godfather-supreme',
    description: 'Triple-stacked beef patties with mushrooms, caramelized onions, swiss cheese, and truffle aioli.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=500&h=300&fit=crop',
    is_available: true,
    category: 'Premium'
  },
  {
    id: '3',
    name: 'Chicken Capone',
    slug: 'chicken-capone',
    description: 'Crispy chicken breast with avocado, pepper jack cheese, jalapeños, and chipotle mayo.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e9a13086?w=500&h=300&fit=crop',
    is_available: true,
    category: 'Chicken'
  }
];

// Static data for featured blog posts
const FEATURED_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Perfect Burger Patties',
    slug: 'art-of-perfect-burger-patties',
    content: 'Discover the secrets behind our hand-crafted burger patties and what makes them so delicious...',
    excerpt: 'Learn how we craft the perfect burger patty with premium ingredients and time-tested techniques.',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=300&fit=crop',
    created_at: '2024-01-15T10:00:00Z',
    author: 'Chef Marco'
  },
  {
    id: '2',
    title: 'New Menu Items Coming This Spring',
    slug: 'new-menu-items-spring',
    content: 'We are excited to announce our new seasonal menu items featuring fresh spring ingredients...',
    excerpt: 'Get ready for our exciting new spring menu featuring fresh, seasonal ingredients and bold flavors.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&h=300&fit=crop',
    created_at: '2024-01-12T14:30:00Z',
    author: 'BurgerMafia Team'
  },
  {
    id: '3',
    title: 'Behind the Scenes: Our Kitchen Stories',
    slug: 'behind-scenes-kitchen-stories',
    content: 'Take a peek behind the curtain and see how our talented chefs prepare your favorite burgers...',
    excerpt: 'Go behind the scenes and discover the passion and dedication that goes into every burger we make.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop',
    created_at: '2024-01-08T16:45:00Z',
    author: 'Chef Isabella'
  }
];

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>BurgerMafia | Home</title>
        <meta name="description" content="Best gourmet burgers in town." />
      </Helmet>

      <Navbar />
      <SEO
        title="Premium Gourmet Burgers"
        description="Experience the finest handcrafted burgers made with premium ingredients."
      />
      <HeroSection />
      <FeaturedMenuSection items={FEATURED_MENU_ITEMS} />
      <FeaturedBlogSection posts={FEATURED_BLOG_POSTS} />
      <CTASection />
    </>
  );
};

// Sub-components
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
      content: PropTypes.string,
      excerpt: PropTypes.string,
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