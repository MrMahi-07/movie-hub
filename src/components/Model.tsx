import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import movieData from "../data/movieData.json";
import credit from "../data/credit.json";
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

const style = {
	position: "absolute" as "absolute",
	bgcolor: "background.paper",
	transform: "translate(-50%, -50%)",
	top: "50%",
	left: "50%",
	width: 1,
	minWidth: 300,
	boxShadow: 24,
	p: 3,
};

export default function Model() {
	const [open, setOpen] = React.useState(true);
	const [expand, setExpand] = React.useState(true);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const data = movieData[0];
	let cc = credit.cast;
	console.log(cc.filter((x) => x.order < 4).map((c) => c.name));
	const runtime = 169;

	const getHour = (minute: number): string => {
		let hr = Math.floor(minute / 60);
		let sec = Math.floor(minute % 60);
		return `${hr}h ${sec}m`;
	};

	return (
		<div>
			<Button onClick={handleOpen}>Open modal</Button>
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
						flexWrap={"wrap"}
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
						<Box
							component={"iframe"}
							src={`https://www.youtube.com/embed/${"5WfTEZJnv_8"}?controls=0&amp;autoplay=1&mute=1`}
							title="YouTube video player"
							allowFullScreen
							frameBorder="0"
							width={1}
							sx={{ aspectRatio: "16/9" }}
							minWidth={300}
						/>
						<Stack direction={"row"} spacing={2}>
							<Box
								component={"img"}
								src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
								alt={data.title}
								sx={{
									aspectRatio: "2/3",
									objectFit: "cover",
									display: { xs: "block", sm: "none" },
								}}
								maxWidth={120}
								maxHeight={220}
							/>
							<Stack spacing={2}>
								<Stack direction={"row"} spacing={1}>
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
											{credit.crew
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
											{credit.crew
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
											{credit.cast
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
		</div>
	);
}
