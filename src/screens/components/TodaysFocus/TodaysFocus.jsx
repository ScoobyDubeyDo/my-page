import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import style from "./todaysFocus.module.css";

export const TodaysFocus = () => {
    const [focusInput, setFocusInput] = useState("");

    const [currentFocus, setCurrentFocus] = useState(
        JSON.parse(localStorage.getItem("Focus")) || {
            inEdit: false,
            focusDone: false,
            focusText: "",
        }
    );

    const focusValueHandler = () => {
        setCurrentFocus((prev) => {
            localStorage.setItem(
                "Focus",
                JSON.stringify({
                    ...prev,
                    focusText: focusInput,
                    inEdit: false,
                })
            );
            return { ...prev, focusText: focusInput, inEdit: false };
        });
    };

    const focusDeleteHandler = () => {
        setFocusInput("");
        const temp = {
            inEdit: false,
            focusDone: false,
            focusText: "",
        };
        localStorage.setItem("Focus", JSON.stringify(temp));
        setCurrentFocus(temp);
    };

    const focusEditHandler = () => {
        return () =>
            setCurrentFocus((prev) => {
                setFocusInput(prev.focusText);
                localStorage.setItem(
                    "Focus",
                    JSON.stringify({
                        ...prev,
                        inEdit: true,
                        focusDone: false,
                    })
                );
                return {
                    ...prev,
                    inEdit: true,
                    focusDone: false,
                };
            });
    };

    return (
        <div className={`${style["focus"]}`}>
            {currentFocus.focusText && !currentFocus.inEdit ? (
                <>
                    <div className="focus-title heading-5 text-gutterBottom">
                        Focus of the Day:
                    </div>
                    <div className={`${style["focus-done"]} flex-center`}>
                        <span className="icon-btn-ghost-sm hidden">
                            <FiEdit3 />
                        </span>
                        <span className="icon-btn-ghost-sm hidden">
                            <CgClose />
                        </span>
                        <label className="flex-center">
                            <input
                                type="checkbox"
                                checked={currentFocus.focusDone}
                                onChange={() =>
                                    setCurrentFocus((prev) => {
                                        localStorage.setItem(
                                            "Focus",
                                            JSON.stringify({
                                                ...prev,
                                                focusDone: !prev.focusDone,
                                            })
                                        );
                                        return {
                                            ...prev,
                                            focusDone: !prev.focusDone,
                                        };
                                    })
                                }
                            />
                            <span
                                className={`${
                                    currentFocus.focusDone
                                        ? "text-strikethrough"
                                        : ""
                                } heading-4 ${
                                    style["focus-display"]
                                } text-noWrap`}
                            >
                                {currentFocus.focusText}
                            </span>
                        </label>
                        <button
                            onClick={focusEditHandler()}
                            className={`${style["focus-buttons"]} icon-btn-ghost-sm`}
                        >
                            <FiEdit3 />
                        </button>
                        <button
                            onClick={() => focusDeleteHandler()}
                            className={`${style["focus-buttons"]} icon-btn-ghost-sm`}
                        >
                            <CgClose />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="focus-title heading-4">
                        What's your main focus for today?
                    </div>
                    <input
                        className="focus-input heading-4"
                        autoFocus
                        type="text"
                        value={focusInput}
                        onChange={(e) => {
                            setFocusInput(e.target.value);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") focusValueHandler();
                        }}
                        autoComplete="off"
                        spellCheck={false}
                    />
                </>
            )}
        </div>
    );
};
