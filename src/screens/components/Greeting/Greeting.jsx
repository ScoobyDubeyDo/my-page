import date from "date-and-time";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import style from "./greeting.module.css";

export const Greeting = () => {
    const partOfDay = (() => {
        const hr = date.format(new Date(), "HH");
        if (hr >= 0 && hr < 12) {
            return "Good morning";
        } else if (hr === 12) {
            return "Good noon";
        } else if (hr >= 12 && hr <= 17) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    })();

    const [nameObj, setNameObj] = useState({
        name: localStorage.getItem("userName"),
        isGettingChanged: false,
    });
    const [nameInput, setNameInput] = useState(nameObj.name);

    const userNameSetter = () => {
        setNameObj({
            name: nameInput.slice(0, 15),
            isGettingChanged: false,
        });
        setNameInput(nameInput.slice(0, 15));
        localStorage.setItem("userName", nameInput.slice(0, 15));
    };

    return (
        <div
            className={`horizontal-list flex-center ${style["greeting-name-display"]}`}
        >
            <span className={"icon-btn-ghost-sm hidden"}></span>
            <div className={`${style["greeting"]} heading-2`}>
                <span>{`${partOfDay},`}</span>
                {!nameObj.isGettingChanged ? (
                    <span>{` ${nameObj.name}.`}</span>
                ) : (
                    <input
                        className={`${style["name-input"]} heading-2`}
                        autoFocus
                        type="text"
                        value={nameInput}
                        style={{
                            width: `${nameInput.length}ch`,
                        }}
                        onChange={(e) => {
                            setNameInput(e.target.value);
                            e.target.style.width = `${e.target.value.length}ch`;
                        }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") userNameSetter();
                        }}
                        onBlur={() => userNameSetter()}
                        autoComplete="off"
                        spellCheck={false}
                    />
                )}
            </div>
            {!nameObj.isGettingChanged ? (
                <button
                    onClick={() =>
                        setNameObj((prev) => {
                            return {
                                ...prev,
                                isGettingChanged: true,
                            };
                        })
                    }
                    className="icon-btn-ghost-sm hidden tooltip-wrapper"
                >
                    <FiEdit3 />
                    <div className="tooltip text-body-sm">Edit your name</div>
                </button>
            ) : (
                <span className={"icon-btn-ghost-sm hidden"}></span>
            )}
        </div>
    );
};
