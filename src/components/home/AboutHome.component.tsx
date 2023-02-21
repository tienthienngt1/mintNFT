import { Typography, Box, Stack } from "@mui/material";
import { Reveal, Tween } from "react-gsap";
import Grid from "@mui/material/Unstable_Grid2";
import { Telegram } from "react-bootstrap-icons";
import Button1 from "components/commons/Button1.component";
import { Link } from "react-router-dom";

const rarityLable = [
	{
		name: "Shiba Sensei",
		desc: "CEO",
		avatar: "/avatar3.jpg",
		telegram: "https://t.me/senseishib",
	},
	{
		name: "ShibaFighter Dev",
		desc: "COO",
		avatar: "/backgroundLogo.jpg",
		telegram: "https://t.me/YourFriendlyDev",
	},
	{
		name: "Lucas",
		desc: "DESIGNER",
		avatar: "/backgroundLogo.jpg",
		telegram: "https://t.me/LucasFighter",
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
										paddingTop: {
											sm: "15%",
											md: "15%",
											xs: "20%",
											lg: "15%",
											xl: "15%",
										},
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
									<Typography align="center" color={"white"}>
										{r.name}
									</Typography>
									<Typography align="center" color={"white"}>
										{r.desc}
									</Typography>
									<Stack
										direction="row"
										justifyContent="center"
									>
										<Link to={r.telegram} target="_blank">
											<Button1
												title={
													<Telegram
														style={{
															fontSize: 30,
															color: "#058effdf",
														}}
													/>
												}
												style={{ padding: 10 }}
											/>
										</Link>
									</Stack>
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
