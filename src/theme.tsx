import { createTheme } from "@mui/material/styles";
import { red, pink } from "@mui/material/colors";

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
			default: "#302828",
		},
	},
	typography: {
		// fontFamily: ["Concert One", "cursive"].join(","),
		fontFamily: ["Rubik Mono One", "sans-serif"].join(","),
	},
});

export default theme;
