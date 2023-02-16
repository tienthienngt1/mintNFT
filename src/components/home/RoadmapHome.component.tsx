import { Box, Typography } from "@mui/material";
import { Check2Circle } from "react-bootstrap-icons";
import { Reveal, Tween } from "react-gsap";
import Grid from "@mui/material/Unstable_Grid2";

const listRoadMap = [
	{
		phase: "Phase 1",
		desc: [
			"Community organic engagement on media socials.",
			"Community organic engagement on media socials.",
			"Whitepaper Creation.",
			"Reputation system for members.",
			"Release the first set of Shiba Fighter NFTs for players to mint and battle",
			"Implement the core game mechanics",
			"Develop a user-friendly interface for easy gameplay.",
			"Expand the Shiba Fighter community with more social features.",
			"Biggest buy contest.",
		],
	},
	{
		phase: "Phase 2",
		desc: [
			"Marketing engagement.",
			"Introduce a marketplace for buying, selling, and trading Shiba Fighter NFTs.",
			"Add item and gear upgrades to enhance Shiba Fighter NFTs' stats.",
			"Introduce a leaderboard for players to compete for prizes.",
			"Host the first tournament with significant rewards for top players",
			"Introduce staking, allowing players to earn rewards for holding their Shiba Fighter NFTs",
		],
	},
	{
		phase: "Phase 3",
		desc: [
			"Introduce more advanced battle features, such as multiplayer battles and alliances.",
			"Develop a community-driven governance system for players to vote on new features and upgrades.",
			"Expand the Shiba Fighter brand with merchandise and partnerships.",
			"Launch a mobile app for on-the-go gameplay.",
			"Implement a referral system to reward players for inviting new users to the platform",
		],
	},
	{
		phase: "Phase 4",
		desc: [
			"Host a charity event to give back to the community.",
			"Implement a loyalty program to reward active and long-time players.",
			"Host a large-scale tournament with significant rewards for top players.",
			"Launch a Shiba Fighter's marketplace for buying and selling Shiba NFTs.",
			'Expand the "Shiba Fighter" community with meetups and events',
		],
	},
];

const RoadmapHome = () => {
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
						Roadmap
					</Typography>
					<img
						src="/headingUnderline.svg"
						width={200}
						style={{ marginBottom: "20px" }}
					/>
				</Tween>
			</Reveal>
			<Grid container spacing={2} justifyContent={"center"}>
				{listRoadMap.map((l) => (
					<Grid md={4} lg={3} key={l.phase}>
						<Box
							sx={{
								borderRadius: 5,
								border: "1px solid #F87317",
							}}
							height={"100%"}
							p={2}
						>
							<Typography
								sx={{
									typography: {
										md: "h4",
										xs: "h5",
										color: "#F87317",
									},
								}}
								align="center"
								gutterBottom
							>
								{l.phase}
							</Typography>
							{l.desc.map((d) => (
								<Typography
									key={d}
									sx={{
										typography: {
											color: "#ffefe4",
										},
										fontFamily:
											'"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;',
									}}
									gutterBottom
								>
									&#8226; &nbsp;{d}
								</Typography>
							))}
						</Box>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default RoadmapHome;
