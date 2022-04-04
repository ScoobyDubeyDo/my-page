import { useEffect, useState } from "react";
import { get } from "axios";

export const useQuoteDetails = () => {
    const [quoteDetails, setQuoteDetails] = useState({ quote: "", author: "" });

    useEffect(() => {
        (async () => {
            try {
                const res = await get(
                    "https://api.quotable.io/random?tags=education|faith|wisdom|future|friendship|happiness|inspirational|success|&maxLength=100"
                );
                if (res.status === 200) {
                    setQuoteDetails({
                        quote: res.data.content,
                        author: res.data.author,
                    });
                }
            } catch (error) {
                console.log(error.message);
                setQuoteDetails({
                    quote: "It's easier to resist at the beginning than at the end.",
                    author: "Leonardo da Vinci",
                });
            }
        })();
    }, []);

    return { ...quoteDetails };
};
