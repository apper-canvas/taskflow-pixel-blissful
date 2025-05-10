--- /dev/null
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTheme, THEMES } from '../contexts/ThemeContext';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  // Update selected theme when global theme changes
  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
  };

  const saveThemeSettings = () => {
    setTheme(selectedTheme);
    toast.success('Theme settings saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Theme Preferences</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            Choose how Tododododo appears to you. Select a theme preference below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Light Theme Option */}
            <div 
              className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all ${
                selectedTheme === THEMES.LIGHT 
                  ? 'border-primary bg-primary/5' 
                  : 'border-surface-200 dark:border-surface-700 hover:border-primary/30'
              }`}
              onClick={() => handleThemeChange(THEMES.LIGHT)}
            >
              {selectedTheme === THEMES.LIGHT && (
                <div className="absolute top-2 right-2 text-primary">
                  <Check size={16} />
                </div>
              )}
              <div className="flex flex-col items-center p-4">
                <Sun className="w-8 h-8 mb-3 text-yellow-500" />
                <h3 className="font-medium">Light</h3>
                <p className="text-sm text-center mt-2 text-surface-500 dark:text-surface-400">
                  Always use light mode
                </p>
              </div>
            </div>

            {/* Dark Theme Option */}
            <div 
              className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all ${
                selectedTheme === THEMES.DARK 
                  ? 'border-primary bg-primary/5' 
                  : 'border-surface-200 dark:border-surface-700 hover:border-primary/30'
              }`}
              onClick={() => handleThemeChange(THEMES.DARK)}
            >
              {selectedTheme === THEMES.DARK && (
                <div className="absolute top-2 right-2 text-primary">
                  <Check size={16} />
                </div>
              )}
              <div className="flex flex-col items-center p-4">
                <Moon className="w-8 h-8 mb-3 text-blue-400" />
                <h3 className="font-medium">Dark</h3>
                <p className="text-sm text-center mt-2 text-surface-500 dark:text-surface-400">
                  Always use dark mode
                </p>
              </div>
            </div>

            {/* System Theme Option */}
            <div 
              className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all ${
                selectedTheme === THEMES.SYSTEM 
                  ? 'border-primary bg-primary/5' 
                  : 'border-surface-200 dark:border-surface-700 hover:border-primary/30'
              }`}
              onClick={() => handleThemeChange(THEMES.SYSTEM)}
            >
              {selectedTheme === THEMES.SYSTEM && (
                <div className="absolute top-2 right-2 text-primary">
                  <Check size={16} />
                </div>
              )}
              <div className="flex flex-col items-center p-4">
                <Laptop className="w-8 h-8 mb-3 text-purple-500" />
                <h3 className="font-medium">System</h3>
                <p className="text-sm text-center mt-2 text-surface-500 dark:text-surface-400">
                  Match system theme
                </p>
              </div>
            </div>
          </div>

          <button onClick={saveThemeSettings} className="btn btn-primary">Save Theme Settings</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;