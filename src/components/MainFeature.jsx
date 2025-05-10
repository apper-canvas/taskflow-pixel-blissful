import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Define all required icons
  const PlusIcon = getIcon('Plus');
  const CheckIcon = getIcon('Check');
  const TrashIcon = getIcon('Trash2');
  const EditIcon = getIcon('Edit2');
  const InfoIcon = getIcon('Info');
  const AlertCircleIcon = getIcon('AlertCircle');
  const XIcon = getIcon('X');
  const FilterIcon = getIcon('Filter');
  const TagIcon = getIcon('Tag');
  const CalendarIcon = getIcon('Calendar');
  
  // Initialize tasks from localStorage or use empty array
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  });
  
  // State for form inputs
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Validate form inputs
  useEffect(() => {
    setIsFormValid(taskTitle.trim().length > 0);
  }, [taskTitle]);
  
  // Filter tasks based on status and priority
  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });
  
  // Add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast.error("Task title is required");
      return;
    }
    
    const newTask = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      status: 'pending',
      priority: taskPriority,
      dueDate: taskDueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    
    // Reset form
    setTaskTitle('');
    setTaskDescription('');
    setTaskPriority('medium');
    setTaskDueDate('');
    
    toast.success("Task added successfully!");
  };
  
  // Start editing a task
  const handleEditStart = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description || '');
    setTaskPriority(task.priority);
    setTaskDueDate(task.dueDate || '');
  };
  
  // Update an existing task
  const handleUpdateTask = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast.error("Task title is required");
      return;
    }
    
    const updatedTasks = tasks.map(task => {
      if (task.id === editingTask.id) {
        return {
          ...task,
          title: taskTitle.trim(),
          description: taskDescription.trim(),
          priority: taskPriority,
          dueDate: taskDueDate,
          updatedAt: new Date().toISOString(),
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    
    // Reset form
    setEditingTask(null);
    setTaskTitle('');
    setTaskDescription('');
    setTaskPriority('medium');
    setTaskDueDate('');
    
    toast.success("Task updated successfully!");
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTask(null);
    setTaskTitle('');
    setTaskDescription('');
    setTaskPriority('medium');
    setTaskDueDate('');
  };
  
  // Toggle task status
  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        return {
          ...task,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    toast.info("Task status updated");
  };
  
  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success("Task deleted successfully");
  };
  
  // Get priority style
  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };
  
  // Get formatted date
  const getFormattedDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Task Form */}
      <motion.div 
        className="bg-white dark:bg-surface-800 rounded-2xl shadow-card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            {editingTask ? (
              <>
                <EditIcon className="w-5 h-5 mr-2 text-primary" />
                Edit Task
              </>
            ) : (
              <>
                <PlusIcon className="w-5 h-5 mr-2 text-primary" />
                Add New Task
              </>
            )}
          </h2>
          
          <form onSubmit={editingTask ? handleUpdateTask : handleAddTask} className="space-y-4">
            <div>
              <label htmlFor="taskTitle" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Task Title*
              </label>
              <input
                id="taskTitle"
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter task title"
                className="input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="taskDescription" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Description
              </label>
              <textarea
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter task description (optional)"
                className="input min-h-[100px]"
                rows="3"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="taskPriority" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Priority
                </label>
                <select
                  id="taskPriority"
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                  className="input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="taskDueDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Due Date
                </label>
                <input
                  id="taskDueDate"
                  type="date"
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              {editingTask && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`btn ${isFormValid ? 'btn-primary' : 'btn-primary opacity-70 cursor-not-allowed'}`}
                disabled={!isFormValid}
              >
                {editingTask ? 'Update Task' : 'Add Task'}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
      
      {/* Filters and Task List */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Filters */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-medium flex items-center">
              <FilterIcon className="w-5 h-5 mr-2 text-primary" />
              Filters
            </h3>
            
            <div className="flex flex-wrap gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-3 py-1.5 text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-3 py-1.5 text-sm"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Task List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold pl-1">
            Your Tasks ({filteredTasks.length})
          </h3>
          
          {filteredTasks.length === 0 ? (
            <div className="bg-surface-50 dark:bg-surface-800/50 border border-dashed border-surface-300 dark:border-surface-700 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-100 dark:bg-surface-800 rounded-full mb-4">
                <InfoIcon className="w-8 h-8 text-surface-500" />
              </div>
              <h4 className="text-lg font-medium mb-2">No tasks found</h4>
              <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
                {tasks.length === 0 
                  ? "You don't have any tasks yet. Add your first task above!" 
                  : "No tasks match your current filters. Try changing the filters or add a new task."}
              </p>
            </div>
          ) : (
            <motion.ul 
              className="space-y-3 mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.07
                  }
                }
              }}
            >
              <AnimatePresence>
                {filteredTasks.map((task) => (
                  <motion.li
                    key={task.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    className="neu-card overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleTaskStatus(task.id)}
                            className={`flex-shrink-0 w-6 h-6 rounded-full mt-1 border-2 flex items-center justify-center ${
                              task.status === 'completed'
                                ? 'bg-secondary border-secondary dark:bg-secondary-dark dark:border-secondary-dark text-white'
                                : 'border-surface-300 dark:border-surface-600'
                            }`}
                            aria-label={task.status === 'completed' ? "Mark as pending" : "Mark as completed"}
                          >
                            {task.status === 'completed' && (
                              <CheckIcon className="w-4 h-4" />
                            )}
                          </button>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-lg font-medium truncate ${
                              task.status === 'completed' ? 'line-through text-surface-500 dark:text-surface-400' : ''
                            }`}>
                              {task.title}
                            </h4>
                            
                            {task.description && (
                              <p className="mt-1 text-surface-600 dark:text-surface-400 line-clamp-2 text-sm">
                                {task.description}
                              </p>
                            )}
                            
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(task.priority)}`}>
                                <TagIcon className="w-3 h-3 mr-1" />
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </span>
                              
                              {task.dueDate && (
                                <span className="inline-flex items-center text-xs text-surface-500 dark:text-surface-400">
                                  <CalendarIcon className="w-3 h-3 mr-1" />
                                  Due: {getFormattedDate(task.dueDate)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-9 sm:ml-0">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditStart(task)}
                          className="p-2 rounded-full bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                          aria-label="Edit task"
                          disabled={editingTask !== null}
                        >
                          <EditIcon className="w-4 h-4 text-surface-700 dark:text-surface-300" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteTask(task.id)}
                          className="p-2 rounded-full bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                          aria-label="Delete task"
                        >
                          <TrashIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MainFeature;