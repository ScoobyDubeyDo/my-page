import { useEffect, useState } from "react";
import { HomePage, NewUser } from "./components";

function App() {
    const [existingUserName, setExistingUserName] = useState("");
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        setExistingUserName(localStorage.getItem("userName"));
    }, [existingUserName, flag]);
    return (
        <div className="App">
            {existingUserName ? <HomePage /> : <NewUser setFlag={setFlag} />}
        </div>
    );
}

export default App;
