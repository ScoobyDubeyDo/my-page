import { useState } from "react";

export const NewUser = ({ setFlag }) => {
    const [nameInput, setNameInput] = useState("");

    return (
        <div className="clock-greeting-display">
            <div className="focus">
                <div className="focus-title heading-2 ">
                    Hello, what's your name?
                </div>
                <input
                    className="focus-input heading-4"
                    type="text"
                    autoFocus
                    autoComplete="off"
                    spellCheck={false}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            localStorage.setItem("userName", nameInput);
                            setFlag((prev) => !prev);
                        }
                    }}
                />
            </div>
        </div>
    );
};
