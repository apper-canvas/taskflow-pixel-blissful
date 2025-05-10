import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const navigate = useNavigate();
  
  // Define icons
  const AlertTriangleIcon = getIcon('AlertTriangle');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
          <AlertTriangleIcon className="w-10 h-10 text-red-500 dark:text-red-400" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-surface-800 dark:text-surface-100">
          Page Not Found
        </h1>
        
        <p className="text-surface-600 dark:text-surface-300 text-lg mb-8">
          We couldn't find the page you're looking for. The page might have been moved or doesn't exist.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Go back home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;