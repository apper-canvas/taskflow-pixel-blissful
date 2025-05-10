import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { ListChecks, FolderKanban, Settings } from 'lucide-react';

import { ThemeProvider, useTheme } from './contexts/ThemeContext';
// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import SettingsPage from './pages/Settings';

// Main application layout
function AppLayout() {
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  return (
    <div>
      {/* Top Bar with logo and dark mode toggle */}
      <header className="py-4 px-6 sm:px-8 md:px-12 bg-white dark:bg-surface-800 shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <NavLink to="/">
              <h1 className="text-xl font-bold text-primary dark:text-primary-light">
                Tododododo
              </h1>
            </NavLink>
          </motion.div>
          <div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-surface-700">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </header>
      
      {/* Navigation Menu */}
      <div className="fixed top-[60px] left-0 right-0 z-10 bg-white dark:bg-surface-800 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <ul className="flex space-x-1">
            <li>
              <NavLink 
                to="/tasks" 
                className={({ isActive }) => `flex items-center py-3 px-4 font-medium rounded-t-lg transition-colors ${isActive ? 'text-primary border-b-2 border-primary' : 'text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary'}`}
              >
                <ListChecks className="w-5 h-5 mr-2" />
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/projects" 
                className={({ isActive }) => `flex items-center py-3 px-4 font-medium rounded-t-lg transition-colors ${isActive ? 'text-primary border-b-2 border-primary' : 'text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary'}`}
              >
                <FolderKanban className="w-5 h-5 mr-2" />
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => `flex items-center py-3 px-4 font-medium rounded-t-lg transition-colors ${isActive ? 'text-primary border-b-2 border-primary' : 'text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary'}`}
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      
      <main className="pt-[120px] min-h-screen px-6 sm:px-8 md:px-12">
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/" element={<Tasks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="rounded-xl shadow-card text-sm font-medium"
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
}

export default App;