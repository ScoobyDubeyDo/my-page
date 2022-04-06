import { useEffect, useState } from "react";
import { HomePage, NewUser } from "./screens";
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
            // INLINE STYLES ARE REQUIRED HERE TO CONDITIONALLY CHANGE A PART OF THE VALUE, THIS IS NOT POSSIBLE WITH CLASS
            style={{
                backgroundImage: `url(${url})`,
            }}
        >
            {existingUserName ? <HomePage /> : <NewUser setFlag={setFlag} />}
        </div>
    );
}

export default App;
