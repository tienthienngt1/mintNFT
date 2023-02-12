import { Box, Paper } from "@mui/material";

const LogoMint = () => {
	return (
		<Paper
			sx={{
				width: { lg: 620, md: 420, xs: 370 },
				padding: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				borderRadius: 5,
				background: "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
			}}
		>
			<Box
				component={"img"}
				src={"/logo1.jpg"}
				width={{ lg: 600, md: 400, xs: 350 }}
				alt="logo1_mint"
				sx={{ borderRadius: 5 }}
			/>
		</Paper>
	);
};

export default LogoMint;
