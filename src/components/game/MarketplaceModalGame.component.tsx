import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Stack, Typography } from "@mui/material";
import { Nft } from "components/commons/Nft.component";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { buy, getTurn } from "func/interactGame";
import { approveBuy, getBalance } from "func/interactToken";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	maxHeight: "80vh",
	bgcolor: "#d1ca66",
	border: "2px solid #eb0808",
	borderRadius: 4,
	boxShadow: 24,
	p: 4,
	overflowY: "auto",
};

type InvetoryModalT = {
	open: boolean;
	handleClose: () => void;
	address: string | undefined;
	price: string | undefined;
	tokenId?: string;
	owner?: string;
	setNotify: React.Dispatch<
		React.SetStateAction<{
			display: boolean;
			text: string;
			severity: "error" | "success";
		}>
	>;
	// setStatus: React.Dispatch<React.SetStateAction<boolean>>;
	// status: boolean;
};

export default function MarketplaceModalGame({
	open,
	handleClose,
	tokenId,
	address,
	price,
	owner,
	setNotify,
}: InvetoryModalT) {
	const [isLoadingButton, setLoadingButton] = useState(false);
	const [balance, setBalance] = useState<string | undefined>();
	const [turn, setTurn] = useState<any>();

	const handleBuy = async () => {
		if (!tokenId) return;
		if (!address) {
			setNotify({
				display: true,
				text: "Please connect wallet",
				severity: "error",
			});
			return;
		}
		setLoadingButton(true);
		const _approve = await approveBuy(Number(price), address);
		if (typeof _approve === "string") {
			setNotify({ display: true, text: _approve, severity: "error" });
			setLoadingButton(false);
			return;
		}
		if (!_approve) {
			setLoadingButton(false);
			return;
		}
		const res = await buy(address, tokenId);
		if (res) {
			setNotify({
				display: true,
				text: "Buy successfully",
				severity: "success",
			});
		}
		setLoadingButton(false);
		handleClose();
	};

	useEffect(() => {
		(async () => {
			if (!address) return;
			const _balance = await getBalance(address);
			setBalance(_balance);
			if (tokenId) {
				const _turn = await getTurn(tokenId);
				setTurn(_turn);
			}
		})();
	}, [address, tokenId]);

	if (!tokenId) return <></>;
	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
			>
				<Fade in={open}>
					<Box sx={style} width={{ md: 700, xs: 400 }}>
						<>
							<Stack
								direction="column"
								justifyContent="center"
								alignItems="center"
								sx={{ width: "100%", height: "100%" }}
								my={1}
							>
								<Box width={380}>
									<Nft tokenId={tokenId} status={false} />
								</Box>
								<Stack
									direction="row"
									justifyContent={"space-between"}
									width={380}
									my={2}
								>
									<Typography
										fontFamily={"fantasy"}
										color={"rgb(255,255,255,0.8)"}
									>
										Owner:
									</Typography>
									<Typography
										fontFamily={"fantasy"}
										color={"rgb(255,255,255,0.8)"}
									>
										{`${owner?.substring(
											0,
											4
										)}...${owner?.slice(-4)}`}
									</Typography>
								</Stack>
								<Stack
									direction="row"
									justifyContent={"space-between"}
									width={380}
									my={2}
								>
									<Typography
										fontFamily={"fantasy"}
										color={"rgb(255,255,255,0.8)"}
									>
										Turn:
									</Typography>
									<Typography
										fontFamily={"fantasy"}
										color={"rgb(255,255,255,0.8)"}
									>
										{turn}
									</Typography>
								</Stack>
								<Stack
									direction="row"
									justifyContent={"space-between"}
									width={380}
									my={2}
								>
									<Typography
										fontFamily={"fantasy"}
										color={"rgb(255,255,255,0.8)"}
									>
										Available:
									</Typography>
									<Typography
										fontFamily={"fantasy"}
										color={"rgb(255,255,255,0.8)"}
									>
										{Number(balance ?? 0).toLocaleString() +
											"  ShibaF"}
									</Typography>
								</Stack>
								<Stack
									direction="row"
									justifyContent={"space-between"}
									width={380}
									my={2}
								>
									<Typography
										fontFamily={"fantasy"}
										color={"rgb(255,255,255,0.8)"}
									>
										Price:
									</Typography>
									<Typography
										fontFamily={"fantasy"}
										color={"rgb(255,255,255,0.8)"}
									>
										{Number(price ?? 0).toLocaleString() +
											"  ShibaF"}
									</Typography>
								</Stack>
								<LoadingButton
									color="error"
									variant="contained"
									onClick={handleBuy}
									loading={isLoadingButton}
								>
									{owner?.toLowerCase() ===
									address?.toLowerCase()
										? "Cancel"
										: "Buy"}
								</LoadingButton>
							</Stack>
						</>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
