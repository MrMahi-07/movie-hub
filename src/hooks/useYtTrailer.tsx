import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const useYtTrailer = (name: string) => {
	const URL = "https://youtube.googleapis.com/youtube/v3/search";
	const [ytData, setData] = useState("");

	useEffect(() => {
		const controller = new AbortController();

		axios
			.get(URL, {
				signal: controller.signal,
				params: {
					part: "snippet",
					maxResults: 1,
					q: `${name} official trailer`,
					key: "AIzaSyCnPH50i0v5IIgTChDZiKzK3hrB07v7Ed8",
				},
			})
			.then((res) => setData(res.data.items[0].id.videoId))
			.catch((err) => console.log(err.message));

		return () => controller.abort();
	}, []);
	return ytData;
};

export default useYtTrailer;

export const GetId = ({ name }: { name: string }) => {
	const ytData = useYtTrailer(name);

	return (
		<Box
			component={"iframe"}
			src={`https://www.youtube.com/embed/${ytData}?controls=0&amp;autoplay=1&mute=1`}
			title="YouTube video player"
			allowFullScreen
			frameBorder="0"
			width={1}
			sx={{ aspectRatio: "16/9" }}
			minWidth={300}
		/>
	);
};
