import React, { useEffect, useState } from "react";
import clientApi from "../services/client-api";
import { CanceledError } from "axios";
import genres from "../data/genreList.json";
import AddIcon from "@mui/icons-material/Add";
import movieLang from "../data/movieLang.json";

import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Container,
	Divider,
	Paper,
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
	const [hover, setHover] = useState(false);
	console.log(hover);

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

	const handleClick = () => {
		console.info("You clicked the Chip.");
	};

	const toDateString = (date: string) => {
		let LocaleConfig: Intl.DateTimeFormatOptions = { dateStyle: "medium" };
		return new Date(date).toLocaleDateString("en-US", LocaleConfig);
	};

	return (
		<Stack gap={5} direction={{ xs: "column", sm: "row" }} flexWrap={"wrap"}>
			{data?.map((d) => (
				<Card
					key={d.id}
					sx={{
						minWidth: 350,
						maxWidth: 400,
						borderRadius: 4,
						transition: "all .4s",
						"&:hover,&:active": { transform: "scale(1.02)" },
						"&:hover .description": {
							maxHeight: "100vh",
							opacity: 1,
						},
					}}
					elevation={8}
					// onMouseEnter={() => setTimeout(() => setHover(true), 200)}
					// onMouseLeave={() => setTimeout(() => setHover(false), 200)}
				>
					<CardMedia
						component={"img"}
						alt={d.title ? d.title : d.name}
						loading="lazy"
						src={`https://image.tmdb.org/t/p/w500${d.backdrop_path}`}
						// height={300}
					/>
					<CardContent sx={{ position: "relative" }}>
						<Stack spacing={2}>
							<Stack direction={"row"} justifyContent={"space-between"}>
								<Typography variant="h4" fontWeight={"900"}>
									{d.title ? d.title : d.name}
								</Typography>
								<Chip
									label={d.vote_average.toFixed(1)}
									color="success"
									variant="outlined"
									sx={{ borderRadius: 2, mt: 1 }}
								/>
							</Stack>
							<Stack direction={"row"} spacing={1}>
								{d.genre_ids
									.filter((_, i) => i < 3)
									.map((g) =>
										genres
											.filter((x) => x.id == g)
											.map((x) => (
												<Chip
													key={x.id}
													color="info"
													variant="outlined"
													label={x.name}
													onClick={() => console.log(x.id)}
												/>
											))
									)}
							</Stack>
							{d.release_date && (
								<>
									<Divider />
									<Typography variant="subtitle2">
										Release Date:{" "}
										<Typography component={"span"}>
											{toDateString(d.release_date)}
										</Typography>
									</Typography>
								</>
							)}
							{d.original_language && (
								<>
									<Divider />

									<Typography variant="subtitle2">
										Original Language:{" "}
										<Typography component={"span"}>
											{movieLang
												.filter((x) => x.iso_639_1 == d.original_language)
												.map((x) => (
													<Typography component={"span"}>
														{x.english_name}
													</Typography>
												))}
										</Typography>
									</Typography>
								</>
							)}
							{d.vote_count > 100 && (
								<>
									<Divider />
									<Chip
										avatar={<AddIcon />}
										label={d.vote_count}
										onClick={() => console.log(123)}
										sx={{ width: "fit-content", borderRadius: 3 }}
									/>
								</>
							)}
							<Chip
								label="See more like this"
								color="info"
								onClick={() => console.log("see more")}
								sx={{ py: 2.5 }}
							/>
						</Stack>
						<Paper
							className="description"
							sx={{
								position: "absolute",
								bottom: 0,
								left: 0,
								transition: "all .6s",
								maxHeight: 0,
								borderRadius: 4,
							}}
							elevation={4}
						>
							<Typography p={2} fontWeight={"bold"}>
								Overview:
								<Typography>{d.overview}</Typography>
							</Typography>
						</Paper>
					</CardContent>
				</Card>
			))}
		</Stack>
	);
};

export default MovieList;
