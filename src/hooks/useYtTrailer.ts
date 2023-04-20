import axios from "axios";
import { useEffect, useState } from "react";

interface ytProps {
	items: {
		id: string;
	}[];
}

const useYtTrailer = () => {
	const URL = "https://youtube.googleapis.com/youtube/v3/search";
	const [ytData, setData] = useState("");

	// useEffect(() => {
	// const controller = new AbortController();

	axios
		.get(URL, {
			// signal: controller.signal,
			params: {
				part: "snippet",
				maxResults: 1,
				q: "Avatar: The Way of Water official trailer",
				key: "AIzaSyAh0gsTzOgV73tPVhQbkeE9iprkc8aQ35Q",
			},
		})
		.then((res) => setData(res.data.items[0].id.videoId))
		.catch((err) => console.log(err.media_type));

	// return () => controller.abort();
	// }, []);
	return ytData;
};

export default useYtTrailer;
