import { useEffect, useState } from "react";
import { get } from "axios";

const fallbackQuote = {
	quote: "It's easier to resist at the beginning than at the end.",
	author: "Leonardo da Vinci",
};

export const useQuoteDetails = (fetchIt = false) => {
	const [quoteDetails, setQuoteDetails] = useState(
		JSON.parse(localStorage.getItem("quoteDetails")) ?? {
			...fallbackQuote,
		}
	);

	useEffect(() => {
		if (fetchIt) {
			(async () => {
				try {
					const res = await get(
						"https://api.quotable.io/random?tags=education|faith|wisdom|future|happiness|inspirational|success|&maxLength=90"
					);
					if (res.status === 200) {
						setQuoteDetails({
							quote: res.data.content,
							author: res.data.author,
						});
						localStorage.setItem(
							"quoteDetails",
							JSON.stringify({
								quote: res.data.content,
								author: res.data.author,
								date: new Date().toString(),
							})
						);
					}
				} catch (error) {
					console.log(error.message);
					setQuoteDetails({
						...fallbackQuote,
					});
					localStorage.setItem(
						"quoteDetails",
						JSON.stringify({
							...fallbackQuote,
							date: new Date().toString(),
						})
					);
				}
			})();
		} else {
			setQuoteDetails(
				JSON.parse(localStorage.getItem("quoteDetails")) ?? {
					...fallbackQuote,
				}
			);
		}
	}, [fetchIt]);

	return { ...quoteDetails };
};
