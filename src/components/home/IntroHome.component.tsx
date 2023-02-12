import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ButtonCustom from "components/commons/ButtonCustom.component";
import { Link } from "react-router-dom";

const IntroHome = () => {
	return (
		<>
			<Grid
				container
				my={5}
				sx={{
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Grid
					md={5}
					sx={{
						width: { md: 500, xs: 400 },
						height: { md: 600, xs: 500 },
					}}
				>
					<Stack direction={"row"} justifyContent={"center"}>
						<Box
							component="img"
							width={{ md: 500, xs: 400 }}
							height={{ md: 600, xs: 500 }}
							src="/logo2.jpg"
							alt="brand"
							sx={{
								borderRadius: 5,
								boxShadow: `0px 0px 20px 0px #cb3232`,
							}}
						/>
					</Stack>
				</Grid>
				<Grid md={7}>
					<Stack py={10} px={2}>
						<Typography
							sx={{
								typography: {
									md: "h4",
									xs: "h4",
									color: "#cb3232",
								},
							}}
							gutterBottom
						>
							SHIBAFIGHTER
						</Typography>
						<img
							src="/headingUnderline.svg"
							width={350}
							style={{ marginBottom: "20px" }}
						/>
						<Typography color={"rgb(255,255,255,0.8)"} gutterBottom>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Soluta esse quod a libero enim, doloremque
							explicabo expedita velit corporis dolorum! Ducimus
							ex non voluptates iure ab officia iusto.
							Repellendus, eum?
						</Typography>
						<Typography color={"rgb(255,255,255,0.8)"} gutterBottom>
							We are a P2E, and Utility based and driven project.
						</Typography>
						<Typography color={"rgb(255,255,255,0.8)"}>
							Currently ShibaFighter has collections already
							minted on the Ethereum. Are you ready to join the
							ranks of the ShibaFighter army?
						</Typography>
						<Stack
							direction="row"
							spacing={2}
							sx={{ marginTop: 5 }}
						>
							<Link to="/play">
								<ButtonCustom title={"Play"} />
							</Link>
							<Link to="/mint">
								<ButtonCustom title={"Mint Now"} />
							</Link>
						</Stack>
					</Stack>
				</Grid>
			</Grid>
		</>
	);
};

export default IntroHome;
