import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./todoForm";
import TodoList from "./TodoList";


interface Todo {
    id: string
    title: string
    completed: boolean
}
const TodoApp = () => {
    const [tasks, setTasks] = useState<Todo[]>([])
    const [newTask, setNewTask] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState("");

    const inputRef = useRef(null);

    const handleChange = (e:any) => {
        const { value } = e.target;
        setNewTask((prevState) => (prevState = value));
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (newTask === "") return;
        if (!isEditing) {
            const newTaskArr = [
                ...tasks,
                { id: uuidv4(), title: newTask, completed: false }
            ];

            setTasks((prevState) => (prevState = newTaskArr));
            setNewTask("");
            inputRef.current.focus();
        } else {
            const newArr = tasks.slice();
            const indexArr = newArr.map((arr) => arr.id);
            const index = indexArr.indexOf(editId);
            newArr.splice(index, 1, { id: editId, title: newTask, completed: false });
            setTasks((prevState) => (prevState = newArr));
            setNewTask("");
            setEditId("");
            setIsEditing(false);
            inputRef.current.focus();
        }
    };

    const handleClear = () => {
        setTasks([]);
        inputRef.current.focus();
    };

    const handleCancel = () => {
        setIsEditing(false);
        setNewTask("");
        setEditId("");
        inputRef.current.focus();
    };

    const handleDelete = (id) => {
        setTasks((prevState) => prevState.filter((task) => task.id !== id));
    };

    const handleEdit = (id:any) => {
        const item = tasks.find((task:any) => task.id === id);
        setNewTask(item.title);
        setIsEditing(true);
        setEditId(item.id);
        inputRef.current.focus();
    };

    const handleCheck = (title:any, id:any) => {
        if (tasks.find((task:any) => task.id === id).completed) {
            const newArr = tasks.slice();
            const indexArr = newArr.map((arr:any) => arr.id);
            const index = indexArr.indexOf(id);
            newArr.splice(index, 1, { id, title, completed: false });
            setTasks((prevState) => (prevState = newArr));
        } else {
            const newArr = tasks.slice();
            const indexArr = newArr.map((arr:any) => arr.id);
            const index = indexArr.indexOf(id);
            newArr.splice(index, 1, { id, title, completed: true });
            setTasks((prevState) => (prevState = newArr));
        }
    };

    useEffect(() => {
        fetch("/api/todos")
            .then(res => res.json())
            .then(todos => setTasks(todos))
    }, [])

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const liStyle = {
        textDecoration: "line-through",
        fontWeight: "100",
        fontStyle: "italic"
    };
    const TaskLists = tasks.map((task:any) => {
        return (
            <li
                className="list"
                style={task.completed ? liStyle : { textDecoration: "none" }}
                key={task.id}
            >
                {task.title}
                <div>
                    <button
                        title="Delete"
                        className="btn"
                        onClick={() => handleDelete(task.id)}
                    >Delete
                        <i className="fas fa-trash-alt" />
                    </button>
                    <button
                        title="Edit"
                        className="btn"
                        onClick={() => handleEdit(task.id)}
                    >Edit
                        <i className="fas fa-pen-fancy" />
                    </button>
                    <button
                        title="Complete"
                        className="btn"
                        onClick={() => handleCheck(task.title, task.id)}
                    >Done
                        <i className="fas fa-check" />
                    </button>
                </div>
            </li>
        );
    });
    return (
        <div className="TodoApp">
            <div className="todoapp_child">
                <TodoForm
                    onSubmit={handleSubmit}
                    value={newTask}
                    onChange={handleChange}
                    onClick={!isEditing ? handleClear : handleCancel}
                    isEditing={isEditing}
                    reference={inputRef}
                />
                <TodoList>
                    {tasks.length > 0 ? (
                        TaskLists
                    ) : (
                        <span className="no-task">
              <i className="fas fa-tasks" />
              <span className="no-task-p">Add tasks above</span>
            </span>
                    )}
                </TodoList>
            </div>
        </div>
    );
};

export default TodoApp;
