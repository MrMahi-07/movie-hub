import genres from "../data/genreList.json";
import AddIcon from "@mui/icons-material/Add";
import movieLang from "../data/movieLang.json";
import { useMovie } from "../hooks/useMovie";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Divider,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { Masonry } from "@mui/lab";
import Star from "@mui/icons-material/StarRateRounded";
import Model from "./Model";

const MovieList = () => {
	const [video, setVideo] = useState("");
	const { data, error } = useMovie(video);

	if (error)
		return (
			<Typography color="error" variant={"h4"} textAlign={"center"}>
				{error}
			</Typography>
		);

	const handleClick = () => {
		console.log("You clicked the Chip.");
	};

	const toDateString = (date: string) => {
		let LocaleConfig: Intl.DateTimeFormatOptions = { dateStyle: "medium" };
		return new Date(date).toLocaleDateString("en-US", LocaleConfig);
	};

	return (
		<>
			<Masonry columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={4}>
				{data.map((d, i) => (
					<Card
						key={i}
						sx={{
							// minWidth: 380,
							// maxWidth: 400,
							borderRadius: 4,
							transition: "all .4s",
							"&:hover,&:active": { transform: "scale(1.02)" },
							"&:hover .description": {
								maxHeight: "100vh",
							},
						}}
						elevation={8}
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
									<Typography variant="h4">
										{d.title ? d.title : d.name}
									</Typography>

									<>
										<Star fontSize="large" sx={{ color: "gold" }} />
										<Typography fontWeight={600} variant="h5" sx={{ mt: 0.4 }}>
											{d.vote_average.toFixed(1)}
											<Typography component={"span"}>/10</Typography>
										</Typography>
									</>
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
														color="primary"
														variant="outlined"
														label={x.name}
														onClick={() => console.log(x.id)}
													/>
												))
										)}
								</Stack>
								<Divider />
								{d.release_date && (
									<>
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
										<Typography variant="subtitle2">
											Original Language:{" "}
											<Typography component={"span"}>
												{movieLang
													.filter((x) => x.iso_639_1 == d.original_language)
													.map((x) => (
														<Typography key={x.english_name} component={"span"}>
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
									color="primary"
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
								<Stack m={2} spacing={1}>
									<Typography fontWeight={"bold"}>Overview:</Typography>
									<Typography
										sx={{
											display: "-webkit-box",
											WebkitLineClamp: 4,
											overflow: "hidden",
											WebkitBoxOrient: "vertical",
										}}
									>
										{d.overview}
									</Typography>
									<Model data={d} />
								</Stack>
							</Paper>
						</CardContent>
					</Card>
				))}
			</Masonry>
		</>
	);
};

export default MovieList;
