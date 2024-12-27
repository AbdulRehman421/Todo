import React, { useState, useEffect } from "react";
import "./Todo.css";
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from '@mui/icons-material/Delete';

const Todo = () => {
  const [task, setTask] = useState("");
  const [taskCollection, setTaskCollection] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    const loadTasks = () => {
      try {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTaskCollection(savedTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    if (taskCollection.length > 0) {
      try {
        localStorage.setItem('tasks', JSON.stringify(taskCollection));
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    }
  }, [taskCollection]); // Only run when taskCollection changes

  // Handle input change
  const handleTask = (e) => {
    setTask(e.target.value);
  };

  // Add new task
  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = { id: Date.now(), text: task };
      setTaskCollection((prev) => [...prev, newTask]);
      setTask(""); // Clear input after adding task
    }
  };

  // Reset tasks
  const handleReset = () => {
    setTask("");
    setTaskCollection([]); // Clear all tasks
  };

  // Remove task by ID
  const handleComplete = (id) => {
    const remainingTasks = taskCollection.filter((task) => task.id !== id);
    setTaskCollection(remainingTasks);
  };

  return (
    <div className="todo">
      <div>
        <h1 className="todo__title">Today🎯</h1>
      </div>
      <div className="todo__body">
        {taskCollection.map((task) => (
          <div key={task.id} className="task">
            <div className="task__title"> {task.text} </div>
            <div onClick={() => handleComplete(task.id)} className="task__icon">
              <DeleteIcon />
            </div>
          </div>
        ))}
      </div>
      <div className="todo__input">
        <input type="text" value={task} onChange={handleTask} id="task_input" />
        <span onClick={addTask}>
          <AddIcon />
        </span>
        <span onClick={handleReset}>
          <CachedIcon />
        </span>
      </div>
    </div>
  );
};

export default Todo;
