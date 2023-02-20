import MainGame from "components/game/MainGame.component";
import { useLayoutEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Game = () => {
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			{/* <Box my={20}>
				<Typography
					sx={{
						typography: {
							md: "h2",
							xs: "h4",
							color: "#cb3232",
						},
					}}
					align="center"
				>
					COMING SOON
				</Typography>
			</Box> */}

			<MainGame />
		</>
	);
};

export default Game;
