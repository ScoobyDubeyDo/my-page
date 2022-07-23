import { useEffect, useState } from "react";
import { get } from "axios";

export const useBackgroundImage = (fetchIt = false) => {
	const [bgURL, setBgURL] = useState(
		"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
	);
	useEffect(() => {
		if (fetchIt) {
			(async () => {
				try {
					const res = await get(
						"https://pixabay.com/api/?key=26495632-0ad042a0bf74f0acd1f662053&image_type=photo&category=nature&q=landscape&orientation=horizontal&per_page=50&order=popular"
					);
					setBgURL(
						res.data.hits[
							Math.floor(Math.random() * res.data.hits.length)
						].largeImageURL
					);
					localStorage.setItem(
						"image",
						res.data.hits[
							Math.floor(Math.random() * res.data.hits.length)
						].largeImageURL
					);
				} catch (error) {
					console.log(error.message);
				}
			})();
		} else {
			setBgURL(
				JSON.parse(localStorage.getItem("image")) ??
					"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
			);
		}
	}, [fetchIt]);
	return bgURL;
};
