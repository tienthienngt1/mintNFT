import { useContext, useEffect, useState } from "react";
import {
	Avatar,
	Box,
	Typography,
	Stack,
	TextField,
	InputAdornment,
	LinearProgress,
	Button,
} from "@mui/material";
import { connectWallet } from "func/connectWallet";
import { Address } from "layout/index.layout";
import { getQtyOfMinter, getTotalSupply, mint } from "func/interactNft";
import Notify from "components/commons/Nofity.component";
import { Reveal, Tween } from "react-gsap";
import { LoadingButton } from "@mui/lab";
import { approve } from "func/interactToken";
import ButtonCt from "components/commons/ButtonCt.component";

type MainMintT = {
	status: boolean;
	setStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainMint = ({ setStatus, status }: MainMintT) => {
	const { address, setAddress } = useContext(Address);
	const [amount, setAmount] = useState<number>(1);
	const [isLoading, setLoading] = useState(false);
	const [amountMinted, setAmountMinted] = useState<string | undefined>("");
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
			if (amountMinted === "3") {
				setNotify({
					display: true,
					text: "Exceed max mint per minter!",
					severity: "error",
				});
				return;
			}
			let res;
			setLoading(true);
			const statusApprove = await approve(Number(amount), address);
			if (statusApprove === true) {
				res = await mint(address, Number(amount));
			}
			setNotify({
				display: true,
				text:
					typeof statusApprove === "string"
						? statusApprove
						: res?.status
						? "Mint successfull"
						: "Error",
				severity: res?.status ? "success" : "error",
			});
			setStatus(!status);
			setAmount(0);
			setLoading(false);
		}
	};

	const handleCloseNotify = () => setNotify({ ...notify, display: false });

	//get totalSupply
	useEffect(() => {
		const func = async () => {
			const res = await getTotalSupply();
			setTotalSupply(res);
			if (address) {
				const qtyMint = await getQtyOfMinter(address);
				setAmountMinted(qtyMint);
			}
			setTotalSupply(res);
		};
		func();
	}, [status, address]);

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
								src="/backgroundLogo.jpg"
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
						<Box sx={{ width: "100%", my: 5 }}>
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
								Price: ... ShibaF
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
							disabled
							value={amount}
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
											{`(${
												amountMinted ? amountMinted : 0
											}/3)`}
										</span>
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<Stack direction="column" spacing={0.2}>
											<Button
												variant="contained"
												sx={{
													padding: 0,
													minWidth: 25,
												}}
												onClick={() => {
													if (amount >= 3) return;
													setAmount(amount + 1);
												}}
											>
												+
											</Button>
											<Button
												variant="contained"
												sx={{
													padding: 0,
													minWidth: 25,
												}}
												onClick={() => {
													if (amount <= 1) return;
													setAmount(amount - 1);
												}}
											>
												-
											</Button>
										</Stack>
									</InputAdornment>
								),
							}}
						/>
						<Stack
							direction="row"
							justifyContent={"center"}
							sx={{ marginTop: { lg: 10, md: 3 } }}
						>
							<LoadingButton
								loading={isLoading}
								onClick={handleMint}
								variant={"contained"}
								sx={{ background: "#A27BB6" }}
							>
								{address ? "Mint" : "Connect Wallet"}
							</LoadingButton>
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
