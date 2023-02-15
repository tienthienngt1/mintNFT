import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Container,
	Typography,
} from "@mui/material";
import { ArrowDown } from "react-bootstrap-icons";
import { Tween, Reveal } from "react-gsap";

const list = [
	{
		question: "How to play?",
		answer: [
			"You must own at least 1 NFT to play.",
			"Have 5 class of NFT.",
			"Each nft has a different number of hits in a day.",
			"Common Nft has 3 turn.",
			"Uncommon Nft has 4 turn.",
			"Rare Nft has 5 turn.",
			"UltraRare Nft has 6 turn.",
			"Epic Nft has 7 turn.",
		],
	},
	{
		question: "When will I fighting back?",
		answer: ["After 24 hours."],
	},
	{
		question: "What if I lose?",
		answer: ["You will get 50% reward."],
	},
	{
		question: "How is the reward of each monster different?",
		answer: [
			"Each monster will have different rewards. The stronger the monster, the greater the reward.",
		],
	},
	{
		question: "Can I sell my Nft?",
		answer: [
			"Nft can transfer to orther wallet.",
			"Nft is going to sell on marketplace ultill the marketplace is live.",
			"Marketplace is comming soon.",
		],
	},
];

const FAQHome = () => {
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
							typography: {
								md: "h4",
								xs: "h4",
								color: "#cb3232",
							},
						}}
					>
						FAQ
					</Typography>
					<img
						src="/headingUnderline.svg"
						width={80}
						style={{ marginBottom: "20px" }}
					/>
				</Tween>
			</Reveal>
			<Container>
				{list.map((l) => (
					<Accordion
						key={l.question}
						sx={{
							background: "#302828",
							color: "rgb(255,255,255,0.7)",
						}}
					>
						<AccordionSummary
							expandIcon={
								<ArrowDown
									style={{ color: "rgb(255,255,255,0.7)" }}
								/>
							}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>{l.question}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{l.answer.map((a) => (
								<Typography key={a}>{a}</Typography>
							))}
						</AccordionDetails>
					</Accordion>
				))}
			</Container>
		</>
	);
};

export default FAQHome;
