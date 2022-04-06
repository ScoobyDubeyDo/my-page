import { RiSettings5Fill } from "react-icons/ri";
import { useState } from "react";
import {
    CurrentTime,
    Greeting,
    SearchBox,
    TodaysFocus,
    Todos,
    Weather,
} from "./components";
import { useQuoteDetails } from "../hooks";

export const HomePage = () => {
    const { author, quote } = useQuoteDetails();
    const [showTodoBox, setShowTodoBox] = useState(
        JSON.parse(localStorage.getItem("showTodoBox"))
    );

    if (!author) return <></>;

    return (
        <>
            <div className="main">
                <div className="top-bar">
                    <div className="top-left">
                        <SearchBox />
                    </div>
                    <div className="top-right">
                        <Weather />
                    </div>
                </div>

                <div className="clock-greeting-display">
                    <CurrentTime />
                    <Greeting />
                    <TodaysFocus />
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
                        <span
                            onClick={() =>
                                setShowTodoBox((prev) => {
                                    localStorage.setItem("showTodoBox", !prev);
                                    return !prev;
                                })
                            }
                            className="text-body-lg"
                        >
                            Todo
                        </span>
                        {showTodoBox && <Todos />}
                    </div>
                </div>
            </div>
        </>
    );
};
