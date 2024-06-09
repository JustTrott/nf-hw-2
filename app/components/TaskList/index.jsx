import React from 'react';
import Image from 'next/image';
import TaskItem from '../TaskItem';

const TaskList = ( {tasks, onToggleTask, onDeleteTask, filter } ) => {
  // Render TaskItems using TaskItem component
  // Filter tasks by status here
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'completed') {
      return task.completed;
    } else {
      return true;
    }
  });

  return (
    <ul>
      {filteredTasks.map(task => (
        <TaskItem task={task} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} key={task.id} />
      ))}
    </ul>
  );
};

export default TaskList;
