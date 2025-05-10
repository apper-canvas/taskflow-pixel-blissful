import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Bell, User, Check, Save } from 'lucide-react';
import { toast } from 'react-toastify';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem('themePreference') || (darkMode ? 'dark' : 'light')
  );
  
  const [notifications, setNotifications] = useState(true);
  const [username, setUsername] = useState('User');
  
  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('themePreference', selectedTheme);
    
    // Handle system theme if selected
    if (selectedTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark !== darkMode) {
        toggleDarkMode();
      }
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        if (selectedTheme === 'system' && e.matches !== darkMode) {
          toggleDarkMode();
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Set theme based on explicit selection
      const shouldBeDark = selectedTheme === 'dark';
      if (shouldBeDark !== darkMode) {
        toggleDarkMode();
      }
    }
  }, [selectedTheme, darkMode, toggleDarkMode]);

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    toast.success(`Theme set to ${theme}`);
  };

  // Animation variants for theme options
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const handleSaveSettings = () => {
    // Here you would save settings to localStorage or a backend
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-8">Settings</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-medium mb-6">Appearance</h2>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-4">Theme</h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Light theme option */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center p-4 rounded-lg border ${selectedTheme === 'light' ? 'border-primary bg-surface-100' : 'border-surface-200 dark:border-surface-700'}`}
              onClick={() => handleThemeChange('light')}
            >
              <Sun size={24} className="mb-2 text-yellow-500" />
              <span className="font-medium">Light</span>
              {selectedTheme === 'light' && <Check size={16} className="text-primary mt-2" />}
            </motion.button>
            
            {/* Dark theme option */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center p-4 rounded-lg border ${selectedTheme === 'dark' ? 'border-primary bg-surface-700' : 'border-surface-200 dark:border-surface-700'}`}
              onClick={() => handleThemeChange('dark')}
            >
              <Moon size={24} className="mb-2 text-blue-400" />
              <span className="font-medium">Dark</span>
              {selectedTheme === 'dark' && <Check size={16} className="text-primary mt-2" />}
            </motion.button>
            
            {/* System theme option */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center p-4 rounded-lg border ${selectedTheme === 'system' ? 'border-primary bg-surface-100 dark:bg-surface-700' : 'border-surface-200 dark:border-surface-700'}`}
              onClick={() => handleThemeChange('system')}
            >
              <Monitor size={24} className="mb-2 text-surface-500" />
              <span className="font-medium">System</span>
              {selectedTheme === 'system' && <Check size={16} className="text-primary mt-2" />}
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Additional settings sections */}
      <div className="card mb-8">
        <div className="flex items-center mb-4">
          <User className="w-5 h-5 mr-2 text-primary" />
          <h2 className="text-xl font-medium">User Preferences</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              Username
            </label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>
      
      <div className="card mb-8">
        <div className="flex items-center mb-4">
          <Bell className="w-5 h-5 mr-2 text-primary" />
          <h2 className="text-xl font-medium">Notifications</h2>
        </div>
        {/* Notification settings could go here */}
      </div>
      
      <button onClick={handleSaveSettings} className="btn btn-primary flex items-center">
        <Save className="w-4 h-4 mr-2" /> Save Settings
      </button>
    </div>
  );
};

export default Settings;