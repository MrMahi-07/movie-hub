import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode, useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Box, IconButton, useMediaQuery } from "@mui/material";

interface Props {
	children: ReactNode;
	mode: boolean;
}

interface ModeProps {
	onChange: () => void;
}

export function ModeToggler({ onChange }: ModeProps) {
	return (
		<Box>
			<IconButton onClick={() => onChange()}>
				<Brightness4Icon />
			</IconButton>
		</Box>
	);
}

function Theme({ children, mode }: Props) {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	// const [mode, setMode] = useState<"light" | "dark">(
	// 	prefersDarkMode ? "dark" : "light"
	// );

	const darkTheme = createTheme({
		palette: {
			mode: mode ? "dark" : "light",
		},
	});
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />

			{children}
		</ThemeProvider>
	);
}

export default Theme;
