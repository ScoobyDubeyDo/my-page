import { useEffect, useState } from "react";
import { get } from "axios";

export const useBackgroundImage = () => {
    const [bgURL, setBgURL] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await get(
                    "https://pixabay.com/api/?key=26495632-0ad042a0bf74f0acd1f662053&image_type=photo&orientation=horizontal&category=nature&per_page=50&q=landscape&order=latest"
                );
                setBgURL(
                    res.data.hits[Math.floor(Math.random() * 50)].largeImageURL
                );
            } catch (error) {
                console.log(error.message);
                setBgURL(
                    "https://pixabay.com/get/gb8005d973863e554c8fe28c73a5d58b3f20e0e53b53537b428ccea2b22eb551b05688759f29212c29ff327a942f43e767293366864e4c0d3e0c9f0cb442ea38d_1280.jpg"
                );
            }
        })();
    }, []);

    return bgURL;
};
