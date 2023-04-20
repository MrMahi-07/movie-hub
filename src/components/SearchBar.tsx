import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Stack } from "@mui/material";
import { useRef } from "react";
import { useForm } from "react-hook-form";

const Search = styled("div")(({ theme }) => ({
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	width: "100%",
	flexDirection: "row",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

interface Props {
	onSubmit: (q: string) => void;
}

export default function SearchBar({ onSubmit }: Props) {
	const { register, handleSubmit, reset } = useForm();
	return (
		<Box
			component={"form"}
			onSubmit={handleSubmit((data) => {
				onSubmit(data.email);
				reset();
			})}
			width={1}
		>
			<Stack
				direction={"row"}
				p={0.5}
				alignItems={"center"}
				bgcolor={(theme) => alpha(theme.palette.common.white, 0.15)}
				sx={{
					borderRadius: 20,
					"&:hover": {
						backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
					},
				}}
			>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>
				<InputBase
					{...register("email", { required: true })}
					placeholder="Search..."
					fullWidth
					sx={{ color: "inherit" }}
					inputMode="text"
				/>
			</Stack>
		</Box>
	);
}
