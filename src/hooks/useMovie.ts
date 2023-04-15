import { useState, useEffect } from "react";
import clientApi, { CanceledError } from "../services/client-api";

export interface MovieData {
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	media_type: string;
	original_language: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	name: string;
	vote_average: number;
	vote_count: number;
}

interface Response {
	results: MovieData[];
}

export interface MovieQuery {
	video?: string;
}

export const useMovie = (video: string) => {
	const [data, setData] = useState<MovieData[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const controller = new AbortController();
		clientApi
			.get<Response>("/trending/all/day", {
				signal: controller.signal,
				params: { videos: video },
			})
			.then(({ data }) => setData(data.results))
			.catch((err) => {
				if (err instanceof CanceledError) return;
				setError(err.message);
			});

		return () => controller.abort();
	}, []);

	return { data, error };
};
