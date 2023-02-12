import { Typography, Box, Stack } from "@mui/material";
import { Telegram } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const rarityLable = [
	{
		name: "AVEF",
		desc: "CEO",
		avatar: "/avatar1.jpg",
	},
	{
		name: "AVEF",
		desc: "DESIGNER",
		avatar: "/avatar2.jpg",
	},
	{
		name: "AVEF",
		desc: "DEVERLOPER",
		avatar: "/avatar3.jpg",
	},
	{
		name: "AVEF",
		desc: "COO",
		avatar: "/avatar4.jpg",
	},
];
const AboutHome = () => {
	return (
		<>
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
			<Stack
				direction={{ md: "row", xs: "column" }}
				my={10}
				spacing={3}
				justifyContent={"center"}
				alignItems={"center"}
			>
				{rarityLable.map((r, k) => (
					<Box
						key={r.desc}
						width={300}
						className={`container_rarity5 background_rarity5`}
						sx={{
							position: "relative",
							borderRadius: 5,
							overflow: "hidden",
							":hover": {
								cursor: "pointer",
							},
							paddingBottom: "10px",
						}}
					>
						<Box
							component="img"
							src={r.avatar}
							alt="image"
							width={"100%"}
						/>
						<Typography
							sx={{ p: 2, typography: {} }}
							align="center"
						>
							{r.name}
						</Typography>
						<Typography
							sx={{ p: 2, typography: {} }}
							align="center"
						>
							{r.desc}
						</Typography>
						<Stack direction="row" justifyContent={"center"}>
							<Link to="https://telegram.com" target="_blank">
								<Box
									sx={{
										":hover": {
											boxShadow: "0px 0px 10px 0px red",
										},
										background:
											"linear-gradient(136deg, #5976f5 0%, #fc5347 100%)",
										boxShadow: "0px 0px 10px 0px #5976f5",
										transition: "0.4s",
										padding: "10px",
										borderRadius: "50%",
										display: "grid",
										placeContent: "center",
									}}
								>
									<Telegram />
								</Box>
							</Link>
						</Stack>
					</Box>
				))}
			</Stack>
		</>
	);
};

export default AboutHome;
