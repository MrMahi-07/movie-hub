import Theme from "./components/Theme";
import { useState } from "react";
import ModeSwitcher from "./components/ModeSwitcher";
import Grid from "@mui/material/Unstable_Grid2";

function App() {
	const [mode, setMode] = useState(true);

	return (
		<Theme mode={mode}>
			<Grid container spacing={3}>
				<Grid xs={12}>
					<ModeSwitcher onChange={(e) => setMode(e)} />
				</Grid>
				<Grid
					width={200}
					bgcolor={"teal"}
					sx={{ display: { xs: "none", sm: "block" } }}
				>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus nam
						magni quo tempora beatae hic quaerat animi dolorum libero sequi,
						modi esse dolore labore maxime reiciendis recusandae maiores tempore
						voluptatem!
					</p>
				</Grid>
				<Grid sm>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
						impedit aperiam cum minus accusamus officia sit? Voluptates debitis,
						neque atque accusamus inventore molestias quam natus distinctio,
						eius omnis, in exercitationem!
					</p>
				</Grid>
			</Grid>
		</Theme>
	);
}

export default App;
