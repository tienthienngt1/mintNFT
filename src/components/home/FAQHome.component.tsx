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
			"Have 5 classes of NFT. Each nft has a different number of hits in a day.",
			"Common Nft has 3 turn. Uncommon Nft has 4 turn. Rare Nft has 5 turn. UltraRare Nft has 6 turn. Epic Nft has 7 turn.",
			"The bonus will not lock, you can withdraw at any time. But if you withdraw more than 5 days, there will be no fee. Less than 5 days fee will be calculated as follows:",
			"Less than 2 days fee is 40%.",
			"Less than 3 days fee is 30%.",
			"Less than 4 days fee is 20%.",
			"Less than 5 days fee is 10%.",
		],
	},
	{
		question: "When will I fighting back?",
		answer: ["After 24 hours."],
	},
	{
		question: "What if I lose?",
		answer: ["You will get 20% reward."],
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
						marginTop={10}
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
							<Typography
								sx={{
									fontFamily:
										'"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;',
									fontWeight: 400,
									color: "#F87317",
								}}
							>
								{l.question}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{l.answer.map((a) => (
								<Typography
									key={a}
									sx={{
										fontFamily:
											'"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;',
										fontWeight: 400,
									}}
								>
									{a}
								</Typography>
							))}
						</AccordionDetails>
					</Accordion>
				))}
			</Container>
		</>
	);
};

export default FAQHome;
