import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ButtonCustom from "components/commons/ButtonCustom.component";
import { useRef } from "react";
import { Tween, Reveal } from "react-gsap";
import { Link } from "react-router-dom";

const IntroHome = () => {
	const reftitle = useRef(null);
	const reftext1 = useRef(null);
	const reftext2 = useRef(null);
	const reftext3 = useRef(null);
	const refbutton1 = useRef(null);
	const refbutton2 = useRef(null);
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
				<Tween
					from={{
						opacity: 0,
						x: -50,
					}}
					to={{ opacity: 1, x: 0 }}
					duration={2}
					delay={0}
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
				</Tween>
				<Grid md={7}>
					<Stack py={10} px={2}>
						<Reveal trigger={reftitle.current}>
							<Tween
								from={{
									opacity: 0,
									y: -20,
								}}
								to={{
									opacity: 1,
									y: 0,
								}}
								delay={0}
							>
								<Typography
									ref={reftitle}
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
							</Tween>
						</Reveal>
						<Reveal trigger={reftext1.current}>
							<Tween
								ref={reftext1}
								from={{
									opacity: 0,
									y: 20,
								}}
								to={{
									opacity: 1,
									y: 0,
								}}
								delay={0}
							>
								<Typography
									color={"rgb(255,255,255,0.8)"}
									gutterBottom
								>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Soluta esse quod a libero
									enim, doloremque explicabo expedita velit
									corporis dolorum! Ducimus ex non voluptates
									iure ab officia iusto. Repellendus, eum?
								</Typography>
							</Tween>
						</Reveal>
						<Reveal trigger={reftext2.current}>
							<Tween
								ref={reftext2}
								from={{
									opacity: 0,
									y: 20,
								}}
								to={{
									opacity: 1,
									y: 0,
								}}
								delay={1}
							>
								<Typography
									color={"rgb(255,255,255,0.8)"}
									gutterBottom
								>
									We are a P2E, and Utility based and driven
									project.
								</Typography>
							</Tween>
						</Reveal>
						<Reveal trigger={reftext3.current}>
							<Tween
								ref={reftext3}
								from={{
									opacity: 0,
									y: 20,
								}}
								to={{
									opacity: 1,
									y: 0,
								}}
								delay={1}
							>
								<Typography color={"rgb(255,255,255,0.8)"}>
									Currently ShibaFighter has collections
									already minted on the Ethereum. Are you
									ready to join the ranks of the ShibaFighter
									army?
								</Typography>
							</Tween>
						</Reveal>
						<Stack
							direction="row"
							spacing={2}
							sx={{ marginTop: 5 }}
						>
							<Reveal trigger={refbutton1.current}>
								<Tween
									ref={refbutton1}
									from={{
										opacity: 0,
										scaleX: 0,
										scaleY: 0,
									}}
									to={{
										opacity: 1,
										scaleX: 1,
										scaleY: 1,
									}}
									delay={1}
								>
									<Link to="/play">
										<ButtonCustom title={"Play"} />
									</Link>
								</Tween>
							</Reveal>
							<Reveal trigger={refbutton2.current}>
								<Tween
									ref={refbutton2}
									from={{
										opacity: 0,
										scaleX: 0,
										scaleY: 0,
									}}
									to={{
										opacity: 1,
										scaleX: 1,
										scaleY: 1,
									}}
									delay={1}
								>
									<Link to="/mint">
										<ButtonCustom title={"Mint Now"} />
									</Link>
								</Tween>
							</Reveal>
						</Stack>
					</Stack>
				</Grid>
			</Grid>
		</>
	);
};

export default IntroHome;
