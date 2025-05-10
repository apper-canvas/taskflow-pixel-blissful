import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Bell, User, Shield, Save } from 'lucide-react';
import { toast } from 'react-toastify';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  const [notifications, setNotifications] = useState(true);
  const [username, setUsername] = useState('User');
  
  const handleSaveSettings = () => {
    // Here you would save settings to localStorage or a backend
    toast.success("Settings saved successfully!");
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">Settings</h1>
          <p className="text-surface-600 dark:text-surface-400">
            Customize your Tododododo experience with these settings options.
          </p>
        </header>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* User Preferences */}
          <motion.div 
            className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 mr-2 text-primary" />
              <h2 className="text-xl font-semibold">User Preferences</h2>
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
          </motion.div>
          
          {/* Theme Settings */}
          <motion.div 
            className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              {darkMode ? <Moon className="w-5 h-5 mr-2 text-primary" /> : <Sun className="w-5 h-5 mr-2 text-primary" />}
              <h2 className="text-xl font-semibold">Theme</h2>
            </div>
            
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={() => setDarkMode(!darkMode)}
                  className="sr-only peer" 
                />
                <div className="relative w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-surface-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                <span className="ml-3 text-sm font-medium text-surface-700 dark:text-surface-300">
                  {darkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
              </label>
            </div>
          </motion.div>
          
          {/* Notification Settings */}
          <motion.div 
            className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 mr-2 text-primary" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
          </motion.div>
        </div>
        
        <button onClick={handleSaveSettings} className="btn btn-primary flex items-center">
          <Save className="w-4 h-4 mr-2" /> Save Settings
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;