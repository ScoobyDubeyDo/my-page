import { useState } from "react";
import { RiSearchLine, RiGoogleFill } from "react-icons/ri";
import style from "./searchBox.module.css";

export const SearchBox = () => {
    const [searchInput, setSearchInput] = useState("");
    return (
        <span className={`${style["search-box"]}`}>
            <RiGoogleFill id={style["google-logo"]} />
            <RiSearchLine id={style["search-logo"]} />
            <input
                type="text"
                name="google-search"
                autoComplete="off"
                placeholder="Google Search"
                className={`${style["search"]}`}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        document.location.href = `https://www.google.com/search?q=${searchInput}`;
                    }
                }}
            />
        </span>
    );
};
