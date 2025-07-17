import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { dashboardAPI } from '../../services/api';
import { DashboardStats } from '../../types';
import SEO from '../../components/Common/SEO';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-16 flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Admin Dashboard"
        description="BurgerMafia Admin Dashboard"
      />
      
      <div className="min-h-screen bg-black pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome to your BurgerMafia management panel</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-900 p-6 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Menu Items</p>
                  <p className="text-3xl font-bold text-white">{stats?.total_menu_items || 0}</p>
                </div>
                <div className="bg-yellow-400 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900 p-6 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Blog Posts</p>
                  <p className="text-3xl font-bold text-white">{stats?.total_blog_posts || 0}</p>
                </div>
                <div className="bg-yellow-400 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-900 p-6 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Contacts</p>
                  <p className="text-3xl font-bold text-white">{stats?.total_contacts || 0}</p>
                </div>
                <div className="bg-yellow-400 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/admin/menu"
                className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center"
              >
                <div className="text-yellow-400 mb-2">🍔</div>
                <h3 className="text-white font-semibold">Manage Menu</h3>
                <p className="text-gray-400 text-sm">Add, edit, or remove menu items</p>
              </Link>

              <Link
                to="/admin/blogs"
                className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center"
              >
                <div className="text-yellow-400 mb-2">📝</div>
                <h3 className="text-white font-semibold">Manage Blog</h3>
                <p className="text-gray-400 text-sm">Create and edit blog posts</p>
              </Link>

              <Link
                to="/admin/contacts"
                className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center"
              >
                <div className="text-yellow-400 mb-2">💬</div>
                <h3 className="text-white font-semibold">View Contacts</h3>
                <p className="text-gray-400 text-sm">Review customer messages</p>
              </Link>

              <Link
                to="/"
                className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center"
              >
                <div className="text-yellow-400 mb-2">🏠</div>
                <h3 className="text-white font-semibold">View Site</h3>
                <p className="text-gray-400 text-sm">Visit your website</p>
              </Link>
            </div>
          </motion.div>

          {/* Recent Contacts */}
          {stats?.recent_contacts && stats.recent_contacts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Recent Contacts</h2>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="divide-y divide-gray-800">
                  {stats.recent_contacts.map((contact) => (
                    <div key={contact.id} className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-semibold">{contact.name}</h3>
                        <span className="text-sm text-gray-400">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">{contact.email}</p>
                      <p className="text-gray-300">{contact.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;