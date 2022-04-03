import { RiSearchLine, RiGoogleFill, RiSettings5Fill } from "react-icons/ri";

import { useState } from "react";
import { CurrentTime, Weather } from "./components";

export const HomePage = () => {
    const [searchInput, setSearchInput] = useState("");

    return (
        <>
            <div className="main">
                <div className="top-bar">
                    <div className="top-left">
                        <span className="search-box">
                            <RiGoogleFill id="google-logo" />
                            <RiSearchLine id="search-logo" />
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="text"
                                    name="google-search"
                                    autoComplete="off"
                                    placeholder="Google Search"
                                    className="search"
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                    onKeyUp={(e) => {
                                        if (e.key === "Enter") {
                                            document.location.href = `https://www.google.com/search?q=${searchInput}`;
                                        }
                                    }}
                                />
                            </form>
                        </span>
                    </div>
                    <div className="top-right">
                        <Weather />
                    </div>
                </div>

                <div className="clock-greeting-display">
                    <CurrentTime />
                    <div className="greeting heading-2">
                        {`Good morning, ${localStorage.getItem("userName")}.`}
                    </div>
                    <div className="focus">
                        <div className="focus-title heading-4">
                            What's your main focus for today?
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                className="focus-input heading-4"
                                type="text"
                                autoComplete="off"
                                spellCheck={false}
                            />
                        </form>
                    </div>
                </div>
                <div className="bottom-bar">
                    <div className="bottom-left-setting">
                        <RiSettings5Fill size={22} />
                    </div>
                    <div className="bottom-center-quote">
                        <span className="quote-text heading-6">
                            Lorem ipsum dolor sit amet consectetur adipisicing.
                        </span>
                        <span className="quote-author text-subtitle">
                            Lorem, ipsum.
                        </span>
                    </div>
                    <div className="bottom-right-todo">
                        <span className="text-body-lg">Todo</span>
                        <div className="todos-list">
                            <ul className="vertical-list ">
                                {/* <li className="empty-todo">
                                    <p className="text-gutterBottom">
                                        Add a todo to get started
                                    </p>
                                    <button className="btn-filled-blue">
                                        New Todo
                                    </button>
                                </li> */}
                                <li className="todo-item">
                                    <label>
                                        <input type="checkbox" />
                                        Prepare for a quaterly meeting
                                    </label>
                                </li>
                            </ul>
                            <input
                                type="text"
                                className="todos-input"
                                placeholder="New Todo"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};