import { Typography, Stack, Box } from "@mui/material";
import ButtonCustom from "components/commons/ButtonCustom.component";
import { Tween, Reveal } from "react-gsap";
import { Link } from "react-router-dom";

const list = [
	<>&#3647; How to buy on the Arbitrum One chain?</>,
	<>
		&#9755; Go to:{" "}
		{
			<Link
				to="https://chainlist.org/"
				target="_blank"
				style={{ color: "#cb3232" }}
			>
				https://chainlist.org/
			</Link>
		}
	</>,
	<>&#9755; Connect your Metamask wallet and add Arbitrum One chain.</>,
	<>
		&#9755; Buy some ETH on CEX (Binnace,..) and deposit ETH from CEX to
		metamask wallet via Arbitrum One network.
	</>,
	<>
		&#9755; Go to:{" "}
		{
			<Link
				to="https://www.sushi.com/swap"
				target="_blank"
				style={{ color: "#cb3232" }}
			>
				https://www.sushi.com/swap
			</Link>
		}{" "}
		and swap what token you like.
	</>,
];

const HowToBuyHome = () => {
	return (
		<Box my={5}>
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
					<Stack
						direction="column"
						alignItems={"center"}
						justifyContent="center"
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
							How To Buy
						</Typography>
						<img
							src="/headingUnderline.svg"
							width={300}
							style={{ marginBottom: "20px" }}
						/>
					</Stack>
				</Tween>
			</Reveal>
			<Reveal>
				<Tween
					from={{
						opacity: 0,
					}}
					to={{
						opacity: 1,
					}}
					duration={2}
					delay={0.5}
				>
					<Stack
						direction="column"
						alignItems={"center"}
						justifyContent={"center"}
						spacing={5}
					>
						<Box width={{ md: 800 }}>
							{list.map((l, k) => (
								<Typography
									key={k * 0.2}
									sx={{
										typography: {
											color: "rgb(255,255,255,0.8)",
											fontFamily: "monospace",
											fontSize: 20,
											marginLeft: k >= 1 ? 20 : 0,
										},
									}}
									gutterBottom
								>
									{l}
								</Typography>
							))}
						</Box>
						<ButtonCustom title="Buy On SuShi"></ButtonCustom>
					</Stack>
				</Tween>
			</Reveal>
		</Box>
	);
};

export default HowToBuyHome;
