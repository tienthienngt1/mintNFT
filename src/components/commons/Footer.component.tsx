import { Stack, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Discord, Telegram, Twitter } from "react-bootstrap-icons";
import ButtonCt from "./ButtonCt.component";
import { Reveal, Tween } from "react-gsap";
import Button1 from "./Button1.component";
import Container from "@mui/material/Container";

const link = [
	{
		url: "https://twitter.com/_ShibaFighter_",
		name: "Twitter",
		Icon: Twitter,
	},
	{
		url: "https://t.me/shibafighter",
		name: "Telegram",
		Icon: Telegram,
	},
];

const Footer = () => {
	return (
		<Container maxWidth={false}>
			<Box sx={{ marginTop: 20 }}>
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
									<Button1
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
		</Container>
	);
};

export default Footer;
