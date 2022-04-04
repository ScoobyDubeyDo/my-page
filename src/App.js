import { useEffect, useState } from "react";
import { HomePage, NewUser } from "./components";
import { useBackgroundImage } from "./hooks";

function App() {
    const url = useBackgroundImage();
    const [existingUserName, setExistingUserName] = useState("");
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        setExistingUserName(localStorage.getItem("userName"));
    }, [existingUserName, flag]);
    if (!url) return <></>;

    return (
        <div
            className="App"
            style={{
                backgroundImage: `url(${url})`,
            }}
        >
            {existingUserName ? <HomePage /> : <NewUser setFlag={setFlag} />}
        </div>
    );
}

export default App;
