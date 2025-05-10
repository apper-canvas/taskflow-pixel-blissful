import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Task Management Made Simple
          </h1>
          <p className="text-surface-600 dark:text-surface-300 text-lg max-w-2xl mx-auto">
            Keep track of your daily tasks with our intuitive interface. Add, organize, and complete tasks with ease.
          </p>
        </header>
        
        <AnimatePresence>
          {loading ? (
            <motion.div 
              className="flex justify-center items-center py-20"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-20 h-20">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-surface-200 dark:border-surface-700 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MainFeature />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Home;