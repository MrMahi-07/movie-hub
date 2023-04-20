import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import credit from "../data/credit.json";
import {
	Breadcrumbs,
	Chip,
	Collapse,
	Divider,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
} from "@mui/material";

import genres from "../data/genreList.json";
import Star from "@mui/icons-material/StarRateRounded";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { MovieProps, useCredit } from "../hooks/useMovie";
import { useState } from "react";
import axios from "axios";
import { GetId } from "../hooks/useYtTrailer";

const style = {
	position: "absolute" as "absolute",
	bgcolor: "background.paper",
	transform: "translate(-50%, -50%)",
	top: "50%",
	left: "50%",
	width: 0.9,
	height: 0.9,
	minWidth: 300,
	maxWidth: 1280,
	boxShadow: 24,
	p: 3,
	overflowY: "auto",
};

interface Props {
	data: MovieProps;
}

interface ytProps {
	items: {
		id: string;
	}[];
}

export default function Model({ data }: Props) {
	const [open, setOpen] = React.useState(false);

	return (
		<div>
			<Chip
				label="Click here for more info."
				// color="primary"
				onClick={() => setOpen(true)}
				sx={{ width: "fit-content" }}
			/>
			{open && (
				<CreateModel
					data={data}
					clicked={open}
					onClose={() => setOpen(false)}
				/>
			)}
		</div>
	);
}

interface CreateProps {
	data: MovieProps;
	clicked: boolean;
	onClose: () => void;
}

const CreateModel = ({ data, clicked, onClose }: CreateProps) => {
	const { movieDetail } = useCredit(data.id);
	const [ytData, setData] = useState("");
	const [open, setOpen] = React.useState(clicked);
	const [expand, setExpand] = React.useState(true);
	const handleClose = () => {
		setOpen(false);
		onClose();
	};
	// const data = movieData[0];
	const runtime = 169;

	const getHour = (minute: number): string => {
		let hr = Math.floor(minute / 60);
		let sec = Math.floor(minute % 60);
		return `${hr}h ${sec}m`;
	};

	if (!movieDetail) return null;

	const ytTrailer = () => {
		const URL = "https://youtube.googleapis.com/youtube/v3/search";
		axios
			.get(URL, {
				params: {
					part: "snippet",
					maxResults: 1,
					q: `${data.title || data.name} official trailer`,
					key: "AIzaSyCnPH50i0v5IIgTChDZiKzK3hrB07v7Ed8",
				},
			})
			.then((res) => setData(res.data.items[0].id.videoId))
			.catch((err) => console.log(err.message));
	};

	const { credits, videos } = movieDetail;
	const trailer =
		videos.results.length &&
		videos.results.filter((x) => x.type === "Trailer")[0].key;

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={handleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={open}>
				{/* <Box sx={style}> */}
				<Stack
					flexWrap={{ md: "wrap", sm: "nowrap" }}
					direction={{ sm: "column", md: "row" }}
					gap={2}
					sx={style}
				>
					<Box width={1}>
						<Typography id="transition-modal-title" variant="h4">
							{data.title}
						</Typography>
						<Breadcrumbs separator="●">
							<Typography>{data.release_date?.substring(0, 4)}</Typography>
							<Typography>{data.adult ? "A" : "U/A 13+"}</Typography>
							<Typography>{getHour(runtime)}</Typography>
						</Breadcrumbs>
					</Box>
					<Stack width={1} direction={"row"} gap={1}>
						<Box
							component={"img"}
							src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
							alt={data.title}
							sx={{
								objectFit: "cover",
								display: { xs: "none", sm: "block" },
								objectPosition: "center",
							}}
							width={0.24}
						/>
						{trailer ? (
							<Box
								component={"iframe"}
								src={`https://www.youtube.com/embed/${trailer}?controls=0&amp;autoplay=1&mute=1`}
								title="YouTube video player"
								allowFullScreen
								frameBorder="0"
								width={1}
								sx={{ aspectRatio: "16/9" }}
								minWidth={300}
							/>
						) : (
							<GetId name={data.title || data.name} />
						)}
						<Stack
							width={0.3}
							gap={1}
							display={{ xs: "none", sm: "none", md: "flex" }}
						>
							<Button
								variant="outlined"
								href={`https://www.themoviedb.org/movie/${data.id}/images/posters`}
								startIcon={<VideoLibraryIcon />}
								fullWidth
								color="inherit"
								size="large"
								sx={{ height: 1 }}
							>
								Videos
							</Button>
							<Button
								variant="outlined"
								color="inherit"
								href={`https://www.themoviedb.org/movie/${data.id}/videos`}
								startIcon={<PhotoLibraryIcon />}
								fullWidth
								size="large"
								sx={{ height: 1 }}
							>
								Photos
							</Button>
						</Stack>
					</Stack>
					<Stack
						direction={"row"}
						width={1}
						gap={1}
						display={{ md: "none", sm: "flex" }}
					>
						<Button
							variant="outlined"
							href={`https://www.themoviedb.org/movie/${data.id}/videos`}
							startIcon={<VideoLibraryIcon />}
							fullWidth
							color="inherit"
							size="large"
						>
							Videos
						</Button>
						<Button
							variant="outlined"
							color="inherit"
							href={`https://www.themoviedb.org/movie/${data.id}/images/posters`}
							startIcon={<PhotoLibraryIcon />}
							fullWidth
							size="large"
						>
							Photos
						</Button>
					</Stack>
					<Stack direction={"row"} gap={2}>
						<Box
							component={"img"}
							src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
							alt={data.title}
							sx={{
								aspectRatio: "2/3",
								objectFit: "cover",
								display: { xs: "block", sm: "none" },
							}}
							maxWidth={120}
							maxHeight={220}
						/>
						<Stack gap={2}>
							<Stack direction={"row"} gap={1}>
								{data.genre_ids
									.filter((_, i) => i < 3)
									.map((g) =>
										genres
											.filter((x) => x.id == g)
											.map((x) => (
												<Chip
													key={x.id}
													variant="outlined"
													label={x.name}
													onClick={() => console.log(x.id)}
												/>
											))
									)}
							</Stack>
							<Typography
								sx={{
									display: "-webkit-box",
									WebkitLineClamp: 7,
									overflow: "hidden",
									WebkitBoxOrient: "vertical",
								}}
							>
								{data.overview}
							</Typography>
						</Stack>
					</Stack>
					<Box width={1}>
						<Breadcrumbs separator="●">
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<Star fontSize="large" sx={{ color: "gold" }} />
								<Typography fontWeight={600} variant="h5">
									{data.vote_average.toFixed(1)}
									<Typography component={"span"}>/10</Typography>
								</Typography>
							</Box>

							<Typography>{(data.vote_count / 1000).toFixed(2)}K</Typography>
						</Breadcrumbs>
						<Divider />
						<ListItemButton onClick={() => setExpand(!expand)}>
							<ListItemText primary="Top Credits" />
							{expand ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse in={expand} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem sx={{ gap: 2 }}>
									<Typography>Director</Typography>
									<Breadcrumbs separator="•">
										{credits.crew
											.filter((c) => c.job === "Director")
											.map((c) => (
												<Link
													underline="hover"
													key={c.id}
													href={`https://www.themoviedb.org/person/${c.id}`}
													onClick={() => console.log(123)}
												>
													{c.name}
												</Link>
											))}
									</Breadcrumbs>
								</ListItem>
								<Divider />
								<ListItem sx={{ gap: 2 }}>
									<Typography>Writers</Typography>
									<Breadcrumbs separator="•">
										{credits.crew
											.filter((c) => c.department === "Writing")
											.filter((_, i) => i < 3)
											.map((c) => (
												<Link
													underline="hover"
													key={c.id}
													href={`https://www.themoviedb.org/person/${c.id}`}
													onClick={() => console.log(123)}
												>
													{c.name}
												</Link>
											))}
									</Breadcrumbs>
								</ListItem>

								<ListItem sx={{ gap: 2 }}>
									<Typography>Stars</Typography>
									<Breadcrumbs separator="•">
										{credits.cast
											.filter((c) => c.order < 4)
											.map((c) => (
												<Link
													underline="hover"
													key={c.id}
													href={`https://www.themoviedb.org/person/${c.id}`}
													onClick={() => console.log(123)}
												>
													{c.name}
												</Link>
											))}
									</Breadcrumbs>
								</ListItem>
							</List>
						</Collapse>
					</Box>
				</Stack>
				{/* </Box> */}
			</Fade>
		</Modal>
	);
};
