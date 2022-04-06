import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import style from "./todos.module.css";
export const Todos = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState(
        JSON.parse(localStorage.getItem("todos")) || []
    );
    const [showTodosList, setShowTodosList] = useState(!todos.length);

    const deleteHandler = (todoId) => {
        const temp = todos.filter((item) => item.id !== todoId);
        if (!temp.length) setShowTodosList(true);
        else setShowTodosList(false);
        setTodos(temp);
    };

    const doneHandler = (todoId) => {
        const index = todos.findIndex((emp) => emp.id === todoId);
        const newTodo = [...todos];

        newTodo[index] = {
            id: todos[index].id,
            title: todos[index].title,
            isDone: !todos[index].isDone,
        };

        setTodos(newTodo);
    };

    const addHandler = () => {
        setTodos((prev) => [
            ...prev,
            { id: Date.now(), title: todo, isDone: false, isInPomodoro: false },
        ]);
        setTodo("");
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <div className={`${style["todos-list"]}`}>
            <ul className="vertical-list ">
                {showTodosList ? (
                    <li
                        className={`${style["empty-todo"]} flex-center vertical-list`}
                    >
                        <p className="text-gutterBottom">
                            Add a todo to get started
                        </p>
                        <button
                            onClick={() => setShowTodosList((prev) => !prev)}
                            className="btn-filled-blue"
                        >
                            New Todo
                        </button>
                    </li>
                ) : (
                    <>
                        {todos.map(({ id, title, isDone }) => (
                            <li className={`${style["todo-item"]}`} key={id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isDone}
                                        onChange={() => doneHandler(id)}
                                    />
                                    <span
                                        className={
                                            isDone
                                                ? "text-strikethrough text-grayed"
                                                : ""
                                        }
                                    >
                                        {title}
                                    </span>
                                </label>
                                <button
                                    onClick={() => deleteHandler(id)}
                                    className="icon-btn-ghost-sm"
                                >
                                    <IoIosClose />
                                </button>
                            </li>
                        ))}
                    </>
                )}
            </ul>
            {!showTodosList && (
                <input
                    type="text"
                    className={`${style["todos-input"]}`}
                    placeholder="New Todo"
                    value={todo}
                    autoFocus
                    onChange={(e) => setTodo(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && !!e.target.value) {
                            addHandler();
                        }
                    }}
                />
            )}
        </div>
    );
};
