import React, { useState } from 'react';
import './ToDoApp.css';
import { useNavigate } from 'react-router-dom';

const ToDoApp = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/login');
  }

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, isCompleted: false }]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
            {task.text}
            <button onClick={() => toggleTaskStatus(index)}>Toggle Status</button>
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoApp;