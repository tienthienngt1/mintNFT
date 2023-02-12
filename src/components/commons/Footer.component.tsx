import { Stack, Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Discord, Telegram, Twitter } from "react-bootstrap-icons";
import ButtonCt from "./ButtonCt.component";

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
					{link.map((l) => (
						<a href={l.url} key={l.url} target="_blank">
							<ButtonCt
								title={
									<>
										<l.Icon style={{ marginRight: 10 }} />{" "}
										{l.name}
									</>
								}
							/>
						</a>
					))}
				</Stack>
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
			</Box>
		</>
	);
};

export default Footer;
