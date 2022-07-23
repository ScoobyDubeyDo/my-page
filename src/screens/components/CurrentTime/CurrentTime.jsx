import { useEffect, useState } from "react";
import { ImLoop } from "react-icons/im";
import date from "date-and-time";
import style from "./currentTime.module.css";

export const CurrentTime = ({ setGetNewQuote }) => {
	const [time, setTime] = useState(new Date());
	const [is24HourFormat, setIs24HourFormat] = useState(true);
	useEffect(() => {
		const temp = localStorage.getItem("is24HourFormat");
		temp
			? setIs24HourFormat(JSON.parse(temp))
			: localStorage.setItem("is24HourFormat", is24HourFormat);
	}, [is24HourFormat]);

	useEffect(() => {
		const id = setTimeout(() => {
			setTime(new Date());
			if (date.format(time, "HH:mm") === "23:59") {
				setGetNewQuote(true);
			}
		}, 1000);

		return () => {
			clearTimeout(id);
		};
	}, [time, setGetNewQuote]);

	return (
		<div className={`${style["time"]} flex-center`}>
			<span className="icon-btn-ghost-sm hidden"></span>
			{date.format(time, `${is24HourFormat ? "HH" : "h"}:mm:ss`)}
			<button
				className={`icon-btn-ghost-sm tooltip-wrapper `}
				onClick={() =>
					setIs24HourFormat((prev) => {
						localStorage.setItem("is24HourFormat", !prev);
						return !prev;
					})
				}>
				<ImLoop />
				<div className={`tooltip text-body-sm`}>
					{`Switch to ${is24HourFormat ? "12" : "24"}-hour clock`}
				</div>
			</button>
		</div>
	);
};
