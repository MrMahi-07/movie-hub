import React, { useEffect, useState } from "react";
import clientApi from "../services/client-api";
import { CanceledError } from "axios";
import {
	Card,
	CardContent,
	CardMedia,
	Container,
	Stack,
	Typography,
} from "@mui/material";

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
	const [error, setError] = useState("");
	useEffect(() => {
		const controller = new AbortController();
		clientApi
			.get<Response>("/trending/all/day", { signal: controller.signal })
			.then(({ data }) => setData(data.results))
			.catch((err) => {
				if (err instanceof CanceledError) return;
				setError(err.message);
			});

		return () => controller.abort();
	}, []);

	if (error)
		return (
			<Typography color="error" variant={"h4"} textAlign={"center"}>
				{error}
			</Typography>
		);

	return (
		<Stack gap={5} direction={{ xs: "column", sm: "row" }} flexWrap={"wrap"}>
			{data?.map((d) => (
				<Card
					key={d.id}
					sx={{ minWidth: 350, maxWidth: 400, borderRadius: 9 }}
					elevation={12}
				>
					<CardMedia
						component={"img"}
						src={`https://image.tmdb.org/t/p/w500/${d.backdrop_path}`}
						sx={{ aspectRatio: "16/9" }}
					/>
					<CardContent>
						<Typography variant="h4">{d.title ? d.title : d.name}</Typography>
					</CardContent>
				</Card>
			))}
		</Stack>
	);
};

export default MovieList;
