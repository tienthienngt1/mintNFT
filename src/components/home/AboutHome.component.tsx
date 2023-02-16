import { Typography, Box, Stack } from "@mui/material";
import { Reveal, Tween } from "react-gsap";

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
			<Stack
				direction={{ md: "row", xs: "column" }}
				my={10}
				spacing={3}
				justifyContent={"center"}
				alignItems={"center"}
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
							<Box
								width={300}
								className={`container_rarity5 background_rarity5`}
								sx={{
									position: "relative",
									borderRadius: 5,
									overflow: "hidden",
									":hover": {
										cursor: "pointer",
									},
									paddingBottom: "10px",
								}}
							>
								<Box
									component="img"
									src={r.avatar}
									alt="image"
									width={"100%"}
								/>
								<Typography
									sx={{ p: 2, typography: {} }}
									align="center"
								>
									{r.name}
								</Typography>
								<Typography
									sx={{ p: 2, typography: {} }}
									align="center"
								>
									{r.desc}
								</Typography>
							</Box>
						</Tween>
					</Reveal>
				))}
			</Stack>
		</>
	);
};

export default AboutHome;
