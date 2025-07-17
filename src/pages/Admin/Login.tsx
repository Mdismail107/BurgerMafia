import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/Common/SEO';
import toast from 'react-hot-toast';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect after successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!credentials.username.trim()) newErrors.username = 'Username is required';
    if (!credentials.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setLoginError('');

    try {
      const success = await login(credentials.username, credentials.password);
      if (success) {
        toast.success('Login successful!');
      } else {
        setLoginError('Invalid username or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  return (
    <>
      <SEO title="Admin Login" description="BurgerMafia Admin Login" />

      <div className="min-h-screen bg-black flex items-center justify-center pt-16">
        <div className="max-w-md w-full mx-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 p-8 rounded-lg shadow-2xl"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
              <p className="text-gray-400">Access your BurgerMafia dashboard</p>
            </div>

            {loginError && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-400 text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-white font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-gray-800 border ${
                    errors.username ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors`}
                />
                {errors.username && <p className="text-red-400 mt-1">{errors.username}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-white font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-gray-800 border ${
                    errors.password ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors`}
                />
                {errors.password && <p className="text-red-400 mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 text-black py-3 px-6 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
