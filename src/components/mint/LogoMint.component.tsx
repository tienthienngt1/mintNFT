import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";

const logo = [
	"/common.jpg",
	"/uncommon.jpg",
	"/rare.jpg",
	"/ultrarare.jpg",
	"epic.jpg",
];

const LogoMint = () => {
	const [index, setIndex] = useState<number>(0);
	useEffect(() => {
		const id = setTimeout(() => {
			if (index < 4) {
				setIndex(index + 1);
			} else {
				setIndex(0);
			}
		}, 1500);
		return () => {
			clearTimeout(id);
		};
	}, [index]);
	return (
		<Paper
			sx={{
				width: { lg: 570, md: 470, xs: 400 },
				padding: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				borderRadius: 5,
				boxShadow: `0px 0px 40px 0px #611717`,
				background: "linear-gradient(-45deg, #5976f5 0%, #fc5347 100%)",
			}}
		>
			<Box
				component={"img"}
				src={logo[index]}
				width={{ lg: 550, md: 450, xs: 380 }}
				alt="logo1_mint"
				sx={{ borderRadius: 5 }}
			/>
		</Paper>
	);
};

export default LogoMint;
