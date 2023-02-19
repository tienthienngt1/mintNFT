import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Stack, Typography } from "@mui/material";
import { Reveal, Tween } from "react-gsap";
import Container from "@mui/material/Container";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
	labels: ["Liquidity", "Game", "Stake"],
	datasets: [
		{
			label: "Token",
			data: [60, 20, 20],
			backgroundColor: [
				"rgba(255, 99, 132)",
				"rgba(54, 162, 235)",
				"rgba(255, 206, 86)",
			],
			borderWidth: 1,
		},
	],
};

const TokenomicHome = () => {
	return (
		<>
			<Reveal>
				<Tween
					from={{
						opacity: 0,
						x: -50,
					}}
					to={{
						opacity: 1,
						x: 0,
					}}
					delay={0.5}
				>
					<Typography
						sx={{
							marginTop: 10,
							typography: {
								md: "h4",
								xs: "h4",
								color: "#cb3232",
							},
						}}
					>
						Tokenomics
					</Typography>
					<img
						src="/headingUnderline.svg"
						width={260}
						style={{ marginBottom: "20px" }}
					/>
				</Tween>
			</Reveal>
			<Container>
				<Grid container spacing={2}>
					<Grid md={4}>
						<Stack
							direction="column"
							justifyContent={"center"}
							alignContent={"center"}
							sx={{ height: "100%" }}
						>
							<Typography
								sx={{ color: "rgba(255, 99, 132)" }}
								align="right"
								gutterBottom
							>
								Liquidity Pool: 60%
							</Typography>
							<Typography
								sx={{ color: "rgba(54, 162, 235)" }}
								align="right"
								gutterBottom
							>
								Game Pool: 20%
							</Typography>
							<Typography
								sx={{ color: "rgba(255, 206, 86)" }}
								align="right"
								gutterBottom
							>
								Stake Pool: 20%
							</Typography>
						</Stack>
					</Grid>
					<Grid md={8} p={5}>
						<Pie data={data} />
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default TokenomicHome;
