import { Typography, Box, Stack } from "@mui/material";
import { Reveal, Tween } from "react-gsap";
import Grid from "@mui/material/Unstable_Grid2";

const rarityLable = [
	{
		name: "Diodore",
		desc: "CEO",
		avatar: "/avatar1.jpg",
	},
	{
		name: "Sylvester",
		desc: "DESIGNER",
		avatar: "/avatar2.jpg",
	},
	{
		name: "Atli",
		desc: "DEVERLOPER",
		avatar: "/avatar3.jpg",
	},
	{
		name: "Taras",
		desc: "COO",
		avatar: "/avatar4.jpg",
	},
];
const AboutHome = () => {
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
				>
					<Typography
						sx={{
							typography: {
								md: "h4",
								xs: "h4",
								color: "#cb3232",
							},
						}}
					>
						ABOUT
					</Typography>
					<img
						src="/headingUnderline.svg"
						width={150}
						style={{ marginBottom: "20px" }}
					/>
				</Tween>
			</Reveal>
			<Grid
				container
				my={10}
				spacing={3}
				sx={{ display: "flex", justifyContent: "center" }}
			>
				{rarityLable.map((r, k) => (
					<Reveal key={r.desc}>
						<Tween
							from={{
								opacity: 0,
								x: -50,
							}}
							to={{
								opacity: 1,
								x: 0,
							}}
							delay={0.5 * k}
						>
							<Grid sm={6} md={4} lg={3}>
								<Box
									sx={{
										backgroundImage: "url('frame.png')",
										backgroundPosition: "center",
										backgroundRepeat: "no-repeat",
										backgroundSize: "cover",
										position: "relative",
										borderRadius: 5,
										overflow: "hidden",
										":hover": {
											cursor: "pointer",
										},
										padding: "10%",
										paddingTop: "20%",
										aspectRatio: "295/417",
									}}
									p={3}
								>
									<Box
										sx={{
											borderTopLeftRadius: 30,
											borderTopRightRadius: 30,
											overflow: "hidden",
										}}
									>
										<Box
											component="img"
											src={r.avatar}
											alt="image"
											width={"100%"}
										/>
									</Box>
									<Typography
										align="center"
										color={"white"}
										sx={{ paddingTop: 2 }}
									>
										{r.name}
									</Typography>
									<Typography align="center" color={"white"}>
										{r.desc}
									</Typography>
								</Box>
							</Grid>
						</Tween>
					</Reveal>
				))}
			</Grid>
		</>
	);
};

export default AboutHome;
