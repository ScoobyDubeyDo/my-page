import { RiSearchLine, RiGoogleFill, RiSettings5Fill } from "react-icons/ri";
import date from "date-and-time";
import { useState } from "react";
import { CurrentTime, Weather } from "./components";
import { useQuoteDetails } from "../hooks";

export const HomePage = () => {
    const [searchInput, setSearchInput] = useState("");
    const { author, quote } = useQuoteDetails();
    const partOfDay = (() => {
        const hr = date.format(new Date(), "HH");
        if (hr >= 0 && hr < 12) {
            return "Good Morning";
        } else if (hr == 12) {
            return "Good Noon";
        } else if (hr >= 12 && hr <= 17) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    })();
    if (!author) return <></>;

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
                        {`${partOfDay}, ${localStorage.getItem("userName")}.`}
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
                    <span className="bottom-center-quote">
                        <blockquote className="quote-text heading-6">{`"${quote}"`}</blockquote>
                        <cite className="quote-author text-subtitle">
                            {author}
                        </cite>
                    </span>
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
