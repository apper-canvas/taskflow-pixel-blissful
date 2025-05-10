import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ListChecks, FolderKanban, Clock, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
  const [taskCount, setTaskCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [pendingTaskCount, setPendingTaskCount] = useState(0);

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      const savedProjects = localStorage.getItem('projects');
      
      const tasks = savedTasks ? JSON.parse(savedTasks) : [];
      const projects = savedProjects ? JSON.parse(savedProjects) : [];
      
      setTaskCount(tasks.length);
      setProjectCount(projects.length);
      setPendingTaskCount(tasks.filter(task => task.status === 'pending').length);
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);


const Home = () => {
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Tododododo</h1>
        <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto text-lg">
          Stay organized and boost your productivity with our intuitive task management app.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div 
          className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center text-primary mb-4">
            <ListChecks className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-semibold">Tasks</h2>
          </div>
          <p className="text-surface-600 dark:text-surface-400 mb-4">Manage your day-to-day tasks and stay on top of your work.</p>
          <div className="text-3xl font-bold mb-6">{taskCount}</div>
          <Link to="/tasks" className="mt-auto inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors">
            Go to Tasks <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center text-secondary mb-4">
            <FolderKanban className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-semibold">Projects</h2>
          </div>
          <p className="text-surface-600 dark:text-surface-400 mb-4">Organize your tasks into projects to better track your progress.</p>
          <div className="text-3xl font-bold mb-6">{projectCount}</div>
          <Link to="/projects" className="mt-auto inline-flex items-center text-secondary font-medium hover:text-secondary-dark transition-colors">
            Go to Projects <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </motion.div>
    // Simulate loading data
        <motion.div 
          className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center text-accent mb-4">
            <Clock className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-semibold">Pending Tasks</h2>
          </div>
          <p className="text-surface-600 dark:text-surface-400 mb-4">Tasks that need your attention and are waiting to be completed.</p>
          <div className="text-3xl font-bold mb-6">{pendingTaskCount}</div>
          <Link to="/tasks" className="mt-auto inline-flex items-center text-accent font-medium hover:text-orange-700 transition-colors">
            View Pending Tasks <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </motion.div>
      </div>
      
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className="text-surface-500 dark:text-surface-400">
          Use the navigation menu above to access your tasks and projects.
        </p>
      </motion.div>
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
            Tododododo: Simple Task Management
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