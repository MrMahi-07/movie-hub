import { useState, useEffect } from "react";
import clientApi, { CanceledError } from "../services/client-api";

export interface MovieProps {
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
	adult: boolean;
}

interface Response {
	results: MovieProps[];
}

export interface MovieQuery {
	video?: string;
}

export const useMovie = (
	endpoint: string,
	genre: number | null,
	similar: number | null
) => {
	const [data, setData] = useState<MovieProps[]>([]);
	const [error, setError] = useState("");
	const DEFAULT = "/trending/all/day";
	useEffect(() => {
		const controller = new AbortController();
		clientApi
			.get<Response>(endpoint || DEFAULT, {
				signal: controller.signal,
				params: {
					with_genres: genre,
				},
			})
			.then(({ data }) => setData(data.results))
			.catch((err) => {
				if (err instanceof CanceledError) return;
				setError(err.message);
			});

		return () => controller.abort();
	}, [genre, similar]);

	return { data, error };
};

interface CreditProps {
	crew: {
		credit_id: string;
		department: string;
		id: number;
		job: string;
		name: string;
	}[];

	cast: {
		adult: boolean;
		cast_id: number;
		credit_id: string;
		id: number;
		name: string;
		order: number;
	}[];
}

interface MovieDetailProps {
	credits: {
		crew: {
			credit_id: string;
			department: string;
			id: number;
			job: string;
			name: string;
		}[];

		cast: {
			adult: boolean;
			cast_id: number;
			credit_id: string;
			id: number;
			name: string;
			order: number;
		}[];
	};
	videos: {
		results: {
			id: string;
			key: string;
			name: string;
			official: boolean;
			type: string;
		}[];
	};
}

export const useCredit = (id: number) => {
	const [movieDetail, setDetail] = useState<MovieDetailProps | null>();
	const [error, setError] = useState("");

	useEffect(() => {
		const controller = new AbortController();
		clientApi
			.get<MovieDetailProps>(`/movie/${id}`, {
				signal: controller.signal,
				params: { append_to_response: "credits,videos" },
			})
			.then(({ data }) => {
				setDetail(data);
			})
			.catch((err) => {
				if (err instanceof CanceledError) return;
				setError(err.message);
			});

		return () => controller.abort();
	}, []);

	return { movieDetail, error };
};
