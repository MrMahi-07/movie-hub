import Theme from "./components/Theme";
import { useState } from "react";
import ModeSwitcher from "./components/ModeSwitcher";
import Grid from "@mui/material/Unstable_Grid2";
import ResponsiveDrawer from "./components/ResponsiveDrawer";

function App() {
	const [mode, setMode] = useState(true);

	return (
		<Theme mode={mode}>
			<ResponsiveDrawer onToggle={(e) => setMode(e)} />
		</Theme>
	);
}

export default App;
