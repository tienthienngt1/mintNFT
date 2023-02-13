import { useContext, useEffect, useState } from "react";
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
import { getTotalSupply, mint } from "func/getInfoNft";
import Notify from "components/commons/Nofity.component";
import { Reveal, Tween } from "react-gsap";

type MainMintT = {
	status: boolean;
	setStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainMint = ({ setStatus, status }: MainMintT) => {
	const { address, setAddress } = useContext(Address);
	const [amount, setAmount] = useState<string | undefined>("");
	const [totalSupply, setTotalSupply] = useState<string | undefined>("");

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
			if (!amount) return;
			const res = await mint(address, Number(amount));
			setStatus(!status);
			setNotify({
				display: true,
				text: res?.status ? "Mint successfull" : "Error",
				severity: res?.status ? "success" : "error",
			});
			setAmount("");
			await getTotalSupply();
		}
	};

	const handleCloseNotify = () => setNotify({ ...notify, display: false });

	//get totalSupply
	useEffect(() => {
		const func = async () => {
			const res = await getTotalSupply();
			setTotalSupply(res);
		};
		func();
	}, []);

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
					duration={2}
					delay={0.2}
				>
					<Box
						sx={{
							padding: "30px 20px",
							borderRadius: 5,
							background:
								"linear-gradient(135deg, #5976f5 0%, #fc5347 100%)",
						}}
						width={{ lg: 570, md: 470, xs: 400 }}
					>
						<Typography
							sx={{
								typography: {
									lg: "h3",
									md: "h4",
									xs: "h5",
								},
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
						<Box sx={{ width: "100%", my: { lg: 5, md: 3 } }}>
							<div
								style={{
									position: "relative",
									marginBottom: 5,
								}}
							>
								<LinearProgress
									variant="determinate"
									sx={{
										height: 20,
										borderRadius: 5,
									}}
									value={
										Number(
											(
												(Number(totalSupply) / 2000) *
												100
											).toFixed(1)
										) ?? 0
									}
								/>
								<span
									style={{
										position: "absolute",
										color: "rgb(0,0,0,0.6)",
										top: 0,
										fontSize: 13,
										right: "25%",
									}}
								>
									{`${
										(
											(Number(totalSupply) / 2000) *
											100
										).toFixed(1) ?? 0
									}%	(${totalSupply}/2000)`}
								</span>
							</div>
							<Typography>Total Minted</Typography>
						</Box>
						<Stack
							direction={{ md: "row", xs: "column" }}
							justifyContent="space-between"
						>
							<Typography gutterBottom color={"rgb(0,0,0,0.6)"}>
								Price: 0.005 ETH
							</Typography>
							<Typography gutterBottom color={"rgb(0,0,0,0.6)"}>
								Max: 3 Nfts
							</Typography>
						</Stack>
						<TextField
							label="Amount"
							id="outlined-start-adornment"
							sx={{ my: 1, width: "100%" }}
							focused
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<span
											style={{
												marginLeft: 10,
												color: "rgb(0,0,0,0.5)",
												fontSize: 16,
											}}
										>
											{`(${amount ? amount : 0}/3)`}
										</span>
									</InputAdornment>
								),
							}}
						/>
						<Stack
							direction="row"
							justifyContent={"center"}
							sx={{ marginTop: { lg: 10, md: 3 } }}
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
				</Tween>
			</Reveal>
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
