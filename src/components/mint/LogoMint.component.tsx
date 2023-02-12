import { Box, Paper } from "@mui/material";

const LogoMint = () => {
	return (
		<Paper
			sx={{
				width: { lg: 570, md: 470, xs: 400 },
				padding: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				borderRadius: 5,
				background: "linear-gradient(-45deg, #5976f5 0%, #fc5347 100%)",
			}}
		>
			<Box
				component={"img"}
				src={"/logo1.jpg"}
				width={{ lg: 550, md: 450, xs: 380 }}
				alt="logo1_mint"
				sx={{ borderRadius: 5 }}
			/>
		</Paper>
	);
};

export default LogoMint;
