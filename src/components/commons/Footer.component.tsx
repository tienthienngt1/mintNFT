import { Stack, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Discord, Telegram, Twitter } from "react-bootstrap-icons";
import ButtonCt from "./ButtonCt.component";
import { Reveal, Tween } from "react-gsap";

const link = [
	{
		url: "twitter",
		name: "Twitter",
		Icon: Twitter,
	},
	{
		url: "telegram",
		name: "Telegram",
		Icon: Telegram,
	},
	{
		url: "discord",
		name: "Discord",
		Icon: Discord,
	},
];

const Footer = () => {
	return (
		<>
			<Box sx={{ marginTop: 30 }}>
				<Stack
					direction={"row"}
					justifyContent={"center"}
					spacing={2}
					my={5}
				>
					{link.map((l, k) => (
						<Reveal key={l.url}>
							<Tween
								from={{
									opacity: 0,
									y: 50,
								}}
								to={{
									opacity: 1,
									y: 0,
								}}
								delay={0.5 * k}
							>
								<a href={l.url} target="_blank">
									<ButtonCt
										title={
											<>
												<l.Icon
													style={{ marginRight: 10 }}
												/>{" "}
												{l.name}
											</>
										}
									/>
								</a>
							</Tween>
						</Reveal>
					))}
				</Stack>
				<Reveal>
					<Tween
						from={{
							opacity: 0,
							y: -50,
						}}
						to={{
							opacity: 1,
							y: 0,
						}}
						delay={1}
					>
						<Stack direction="row" justifyContent={"center"}>
							<Typography
								align="center"
								gutterBottom
								marginY={2}
								sx={{ color: "#cb3232" }}
							>
								© Copyright ShibaFighter
							</Typography>
						</Stack>
					</Tween>
				</Reveal>
			</Box>
		</>
	);
};

export default Footer;
