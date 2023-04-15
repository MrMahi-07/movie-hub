import React, { useEffect, useState } from "react";
import clientApi from "../services/client-api";

interface MovieData {
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	media_type: string;
	original_language: string;
	// original_title: string;
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

const MovieList = () => {
	const [data, setData] = useState<MovieData[]>();
	useEffect(() => {
		clientApi
			.get<Response>("/trending/all/day")
			.then(({ data }) => setData(data.results))
			.catch((err) => console.log(err.message));
	}, []);
	return (
		<ul>
			{data?.map((d) => (
				<li key={d.id}>{d.title ? d.title : d.name}</li>
			))}
		</ul>
	);
};

export default MovieList;
