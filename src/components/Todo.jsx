import React from "react";
import "./Todo.css";
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

const Todo = () => {
    const [task, setTask] = useState("");
    const [taskCollection, setTaskCollection] = useState([]);
    const handleTask = (e) => {
        setTask(e.target.value);
    };
    const addTask = () => {
        if (task === "") {
        } else {
            setTaskCollection((prev) => [...prev, task]);
            setTask("");
        }
    };
    const handleRest = () => {
        setTask("");
        setTaskCollection([]);
    };
    const handleComplete = (index) => {
        const remainingTasks = taskCollection.filter((task, i) => i !== index);

        setTaskCollection(remainingTasks);
    };

    return (
        <div className="todo">
            <div>
                <h1 className="todo__title">Today🎯</h1>
            </div>
            <div className="todo__body">
                {
                    <div>
                        {taskCollection.map((task, index) => (
                            <div key={index} className="task">
                                <div className="task__title"> {task} </div>{" "}
                                <div
                                    onClick={() => handleComplete(index)}
                                    className="task__icon"
                                >
                                    <DeleteIcon />
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className="todo__input">
                <input type="text" value={task} onChange={handleTask} id="task_input" />{" "}
                <span onClick={addTask}>
                    <AddIcon />
                </span>{" "}
                <span onClick={handleRest}>
                    <CachedIcon />
                </span>
            </div>
        </div>
    );
};

export default Todo;
