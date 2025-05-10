import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const Projects = () => {
  // Define required icons
  const PlusIcon = getIcon('Plus');
  const EditIcon = getIcon('Edit2');
  const TrashIcon = getIcon('Trash2');
  const FoldersIcon = getIcon('Folders');
  const XIcon = getIcon('X');
  const InfoIcon = getIcon('Info');
  
  // Initialize tasks from localStorage to count tasks per project
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  });
  
  // Initialize projects from localStorage
  const [projects, setProjects] = useState(() => {
    try {
      const savedProjects = localStorage.getItem('projects');
      if (savedProjects) {
        return JSON.parse(savedProjects);
      } else {
        // Create default projects
        const defaultProjects = [
          { id: 'default', name: 'General', color: 'bg-primary' }
        ];
        localStorage.setItem('projects', JSON.stringify(defaultProjects));
        return defaultProjects;
      }
    } catch (error) {
      console.error('Error loading projects from localStorage:', error);
      return [{ id: 'default', name: 'General', color: 'bg-primary' }];
    }
  });

  // Project management state
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectColor, setNewProjectColor] = useState('bg-primary');
  const [editingProject, setEditingProject] = useState(null);

  // Project colors
  const projectColors = [
    { name: 'Maroon', value: 'bg-primary' },
    { name: 'Green', value: 'bg-secondary' },
    { name: 'Orange', value: 'bg-accent' },
    { name: 'Blue', value: 'bg-blue-600' },
    { name: 'Purple', value: 'bg-purple-600' },
    { name: 'Teal', value: 'bg-teal-600' }
  ];

  // Update localStorage when projects change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
    // Trigger storage event to notify other components
    window.dispatchEvent(new Event('storage'));
  }, [projects]);
  
  // Listen for task changes
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error('Error loading updated tasks:', error);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Add a new project
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) {
      toast.error("Project name is required");
      return;
    }

    const projectId = editingProject 
      ? editingProject.id 
      : Date.now().toString();
    
    if (editingProject) {
      // Update existing project
      const updatedProjects = projects.map(project => 
        project.id === editingProject.id 
          ? { ...project, name: newProjectName.trim(), color: newProjectColor }
          : project
      );
      setProjects(updatedProjects);
      toast.success("Project updated successfully!");
    } else {
      // Create new project
      const newProject = {
        id: projectId,
        name: newProjectName.trim(),
        color: newProjectColor,
        createdAt: new Date().toISOString()
      };
      setProjects([...projects, newProject]);
      toast.success("Project created successfully!");
    }

    // Reset project form
    setNewProjectName('');
    setNewProjectColor('bg-primary');
    setEditingProject(null);
    setShowProjectForm(false);
  };

  // Start editing a project
  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProjectName(project.name);
    setNewProjectColor(project.color || 'bg-primary');
    setShowProjectForm(true);
  };

  // Delete a project and reassign tasks
  const handleDeleteProject = (projectId) => {
    // Don't allow deleting the default project
    if (projectId === 'default') {
      toast.error("Cannot delete the default project");
      return;
    }

    // Remove the project
    setProjects(projects.filter(p => p.id !== projectId));
    
    // Reassign tasks from this project to the default project
    const updatedTasks = tasks.map(task => {
      if (task.projectId === projectId) {
        return {
          ...task,
          projectId: 'default',
          updatedAt: new Date().toISOString()
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    toast.info("Project deleted and tasks reassigned");
  };
  
  // Cancel project editing
  const handleCancelProjectEdit = () => {
    setShowProjectForm(false);
    setEditingProject(null);
    setNewProjectName('');
    setNewProjectColor('bg-primary');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.h1 
        className="text-3xl font-bold text-primary mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Projects
      </motion.h1>

      <motion.div
        className="bg-white dark:bg-surface-800 rounded-2xl shadow-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <FoldersIcon className="w-5 h-5 mr-2 text-primary" />
              Manage Projects
            </h2>
            <button
              onClick={() => setShowProjectForm(!showProjectForm)}
              className="btn btn-outline flex items-center"
            >
              {showProjectForm ? (
                <>
                  <XIcon className="w-4 h-4 mr-1" />
                  Cancel
                </>
              ) : (
                <>
                  <PlusIcon className="w-4 h-4 mr-1" />
                  New Project
                </>
              )}
            </button>
          </div>

          {showProjectForm && (
            <form onSubmit={handleAddProject} className="mb-6 p-4 bg-surface-50 dark:bg-surface-700/30 rounded-xl">
              <div className="space-y-4">
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Project Name*
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Enter project name"
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="projectColor" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectColors.map(color => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setNewProjectColor(color.value)}
                        className={`w-8 h-8 rounded-full ${color.value} ${
                          newProjectColor === color.value ? 'ring-2 ring-offset-2 ring-surface-900 dark:ring-white' : ''
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-2">
                  <button type="button" onClick={handleCancelProjectEdit} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">{editingProject ? 'Update' : 'Create'} Project</button>
                </div>
              </div>
            </form>
          )}

          {projects.length === 0 ? (
            <div className="bg-surface-50 dark:bg-surface-800/50 border border-dashed border-surface-300 dark:border-surface-700 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-100 dark:bg-surface-800 rounded-full mb-4">
                <InfoIcon className="w-8 h-8 text-surface-500" />
              </div>
              <h4 className="text-lg font-medium mb-2">No projects found</h4>
              <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
                Create your first project to organize your tasks!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map(project => (
                <motion.div 
                  key={project.id} 
                  className="bg-surface-50 dark:bg-surface-700/30 rounded-xl p-4 relative group"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${project.color} mr-2`}></div>
                    <h3 className="font-medium truncate flex-1">{project.name}</h3>
                    
                    {project.id !== 'default' && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEditProject(project)}
                          className="p-1.5 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600"
                        >
                          <EditIcon className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30"
                        >
                          <TrashIcon className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                    {tasks.filter(task => task.projectId === project.id).length} tasks
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;