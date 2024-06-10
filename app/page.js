'use client'
import { useState, useEffect } from 'react';

import TaskList from './components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTaskText, setNewTaskText] = useState('');
  
  let didInit = false;
  
  // Load tasks from localStorage on component mount
  useEffect(() => {
    if (didInit) return;
    didInit = true;
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks !== null) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []); // Empty dependency array ensures this runs only once on mount
  
  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTaskText, completed: false }]);
      setNewTaskText(''); // Clear the input field
    }
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
        
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        {/* Medium level: extract todo's listing to TaskList component */}
        {/* Basic level: map through tasks state by using this code: */}
        <TaskList tasks={tasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} filter={filter} />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span> 
            {tasks.filter(task => !task.completed).length} items left</span>  {/* show how many uncompleted items left */}
          <div>
            <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={() => handleClearCompleted()}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
    // <> </>
  );
}
