import { useEffect, useState } from "react";
import { RiSettings5Fill } from "react-icons/ri";
import date from "date-and-time";
import { useQuoteDetails } from "../hooks";
import {
	CurrentTime,
	Greeting,
	SearchBox,
	TodaysFocus,
	Todos,
	Weather,
} from "./components";

export const HomePage = () => {
	const [getNewQuote, setGetNewQuote] = useState(false);
	const { author, quote } = useQuoteDetails(getNewQuote);
	const [showTodoBox, setShowTodoBox] = useState(
		JSON.parse(localStorage.getItem("showTodoBox"))
	);
	useEffect(() => {
		const { date: oldQuoteDate } = JSON.parse(
			localStorage.getItem("quoteDetails")
		);
		if (
			date.format(new Date(oldQuoteDate), "DD:MM") !==
			date.format(new Date(), "DD:MM")
		) {
			console.log("indise");
			setGetNewQuote(true);
		} else setGetNewQuote(false);
	}, []);

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
					<CurrentTime setGetNewQuote={setGetNewQuote} />
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
							className="text-body-lg">
							Todo
						</span>
						{showTodoBox && <Todos />}
					</div>
				</div>
			</div>
		</>
	);
};
