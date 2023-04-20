import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ModeSwitcher from "./ModeSwitcher";
import genres from "../data/genreList.json";
import logo from "../assets/logo.svg";
import { Avatar } from "@mui/material";
import MovieList from "./MovieList";
import { useState } from "react";

const drawerWidth = 200;

interface Props {
	onToggle: (mode: boolean) => void;
}

export default function ResponsiveDrawer({ onToggle }: Props) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
	const [similar, setSimilar] = useState<number | null>(null);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				{genres.map((genre) => (
					<ListItem key={genre.id} disablePadding>
						<ListItemButton
							selected={genre.id == selectedGenre}
							onClick={() => setSelectedGenre(genre.id)}
						>
							<ListItemIcon>
								<Box
									component={"img"}
									alt={genre.name}
									// src={`src\\assets\\genre\\${genre.name.toLowerCase()}.webp`}
									src={`/genre/${genre.name.toLowerCase()}.webp`}
									height={35}
								/>
							</ListItemIcon>
							<ListItemText primary={genre.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<Avatar alt="Remy Sharp" src="src\assets\genre\war.webp" />
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					// width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					zIndex: (theme) => {
						return theme.zIndex.drawer + 1;
					},
				}}
			>
				<Toolbar sx={{ gap: 2, justifyContent: "flex-start" }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<a href="/" aria-label="Home Page">
						<Box component={"img"} title="logo" src={logo} height={20} />
					</a>
					<Typography variant="h6" noWrap component="div">
						Responsive drawer
					</Typography>
					<ModeSwitcher onChange={(e) => onToggle(e)} />
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					// width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				<MovieList
					genre={selectedGenre}
					onSimilarSelect={(id) => setSimilar(id)}
					similar={similar}
				/>
			</Box>
		</Box>
	);
}
