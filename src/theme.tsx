import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
	palette: {
		primary: {
			main: "#a27bb6",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#52504e",
		},
	},
	typography: {
		fontFamily: ["Rubik Mono One", "sans-serif"].join(","),
		allVariants: {
			color: "white",
		},
	},
});

export default theme;
