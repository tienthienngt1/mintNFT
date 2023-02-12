import { useContext, useState } from "react";
import {
	Avatar,
	Box,
	Typography,
	Stack,
	TextField,
	InputAdornment,
	Button,
	LinearProgress,
} from "@mui/material";
import { connectWallet } from "func/connectWallet";
import { Address } from "layout/index.layout";
import { mint } from "func/getInfoNft";
import Notify from "components/commons/Nofity.component";

type MainMintT = {
	status: boolean;
	setStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainMint = ({ setStatus, status }: MainMintT) => {
	const { address, setAddress } = useContext(Address);
	const [amount, setAmount] = useState<string | undefined>("");
	const [notify, setNotify] = useState<{
		display: boolean;
		text: string;
		severity: "error" | "success";
	}>({ display: false, text: "", severity: "error" });
	const handleConnect = async () => {
		const res = await connectWallet();
		if (res && setAddress) setAddress(res);
		return res;
	};

	const handleMint = async () => {
		if (!address) {
			await handleConnect();
		} else {
			const res = await mint(address, Number(amount));
			setStatus(!status);
			setNotify({
				display: true,
				text: res?.status ? "Mint successfull" : "Error",
				severity: res?.status ? "success" : "error",
			});
		}
	};

	const handleCloseNotify = () => setNotify({ ...notify, display: false });

	return (
		<>
			<Box
				sx={{
					padding: "30px 20px",
					borderRadius: 5,
					background:
						"linear-gradient(135deg, #5976f5 0%, #fc5347 100%)",
				}}
				width={{ lg: 600, md: 400, xs: 350 }}
			>
				<Typography
					sx={{
						typography: { md: "h3", xs: "h5" },
						fontWeight: "bold",
					}}
					gutterBottom
				>
					ShibaFighter
				</Typography>
				<Stack
					direction={"row"}
					alignItems="center"
					justifyContent="space-between"
				>
					<Avatar
						alt="logo"
						src="/logo.jpg"
						sx={{ width: 100, height: 100 }}
					/>
					<Typography
						sx={{
							typography: { md: "h5", xs: "body1" },
							fontWeight: "bold",
						}}
					>
						Total: 2000NFTs
					</Typography>
				</Stack>
				<Box sx={{ width: "100%", my: 7 }}>
					<div style={{ position: "relative", marginBottom: 5 }}>
						<LinearProgress
							variant="determinate"
							sx={{
								height: 20,
								borderRadius: 5,
							}}
							value={10}
						/>
						<span
							style={{
								position: "absolute",
								color: "rgb(0,0,0,0.6)",
								top: 0,
								fontSize: 13,
								right: "35%",
							}}
						>
							{`100%	(0/2000)`}
						</span>
					</div>
					<Typography>Total Minted</Typography>
				</Box>
				<TextField
					label="Price"
					id="outlined-start-adornment"
					sx={{ my: 1, width: "100%" }}
					focused
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<span
									style={{ color: "#2a252c", fontSize: 20 }}
								>
									0.005 ETH
								</span>
								<span
									style={{
										marginLeft: 10,
										color: "rgb(0,0,0,0.5)",
										fontSize: 16,
									}}
								>
									(0/3)
								</span>
							</InputAdornment>
						),
					}}
				/>
				<Stack
					direction="row"
					justifyContent={"center"}
					sx={{ marginTop: 10 }}
				>
					<Button
						onClick={handleMint}
						variant={"contained"}
						sx={{ background: "#A27BB6" }}
					>
						{address ? "Mint" : "Connect Wallet"}
					</Button>
				</Stack>
			</Box>
			<Notify
				display={notify.display}
				text={notify.text}
				severity={notify.severity}
				handleClose={handleCloseNotify}
			/>
		</>
	);
};

export default MainMint;
