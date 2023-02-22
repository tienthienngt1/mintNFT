import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Input, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Nft } from "components/commons/Nft.component";
import { useEffect, useState } from "react";
import {
	isAprovedForAll,
	setApprovalForAll,
	transferFrom,
} from "func/interactNft";
import { LoadingButton } from "@mui/lab";
import { cancel, isListByTokenId, sell } from "func/interactGame";
import LoadingMarketplace from "components/commons/LoadingMarketplace.component";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	maxHeight: "80vh",
	bgcolor: "#302828",
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
	tokenId?: string;
	setNotify: React.Dispatch<
		React.SetStateAction<{
			display: boolean;
			text: string;
			severity: "error" | "success" | "info";
		}>
	>;
	setStatus: React.Dispatch<React.SetStateAction<boolean>>;
	status: boolean;
};

export default function InvetoryModalGame({
	open,
	handleClose,
	tokenId,
	address,
	setNotify,
	setStatus,
	status,
}: InvetoryModalT) {
	const [alignment, setAlignment] = useState("sell");
	const [isApprovalAll, setApprovalAll] = useState(false);
	const [isLoadingButton, setLoadingButton] = useState(false);
	const [isListed, setListed] = useState(false);
	const [value, setValue] = useState<string>("");
	const [loading, setLoading] = useState(true);

	const handle = async () => {
		if (!address || !tokenId) return;
		if (!value) return;
		if (alignment === "sell") {
			//=============
			setNotify({
				display: true,
				text: "Marketplace coming soon",
				severity: "info",
			});
			return;

			//=============
		}
		setLoadingButton(true);
		if (alignment === "sell") {
			const res = await sell(address, tokenId, value);
			let flag = false;
			if (res) flag = true;
			setNotify({
				display: true,
				text: flag ? "Sell Successfully" : "Error",
				severity: flag ? "success" : "error",
			});
		} else {
			const res = await transferFrom(address, value, tokenId);
			setNotify({
				display: true,
				text: res ? "Transfer Successfully" : "Error",
				severity: res ? "success" : "error",
			});
		}
		handleClose();
		setStatus(!status);
		setLoadingButton(false);
		setValue("");
	};

	const handleCancel = async () => {
		//=============
		setNotify({
			display: true,
			text: "Marketplace coming soon",
			severity: "info",
		});
		return;

		//=============
		if (!address) return;
		setLoadingButton(true);
		if (tokenId) {
			const res = await cancel(address, tokenId);
			setNotify({
				display: true,
				text: res ? "Cancel successfully" : "error",
				severity: res ? "success" : "error",
			});
		}
		handleClose();
		setStatus(!status);
		setLoadingButton(false);
	};

	const handleApproval = async () => {
		//=============
		setNotify({
			display: true,
			text: "Marketplace coming soon",
			severity: "info",
		});
		return;

		//=============
		if (!value) {
			setNotify({
				display: true,
				text: "Please enter price",
				severity: "error",
			});
			return;
		}
		setLoadingButton(true);
		const _isApprove = await setApprovalForAll(address);
		if (_isApprove) {
			setNotify({
				display: true,
				text: "Approval Successfully",
				severity: "success",
			});
		}
		setLoadingButton(false);
		setApprovalAll(true);
	};

	useEffect(() => {
		if (!address) return;
		(async () => {
			const _isApprovalAll = await isAprovedForAll(address);
			setApprovalAll(_isApprovalAll);
			if (tokenId) {
				const _isListed = await isListByTokenId(tokenId);
				setListed(_isListed);
			}
			setLoading(false);
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
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box
						className="hidden-bar"
						sx={style}
						width={{ md: 700, xs: 400 }}
					>
						{loading ? (
							<LoadingMarketplace />
						) : (
							<>
								<Stack
									direction="column"
									justifyContent="center"
									alignItems="center"
									sx={{ width: "100%", height: "100%" }}
									my={5}
								>
									<Box width={380}>
										<Nft
											tokenId={tokenId}
											status={status}
										/>
									</Box>
									{isListed ? (
										<LoadingButton
											onClick={handleCancel}
											sx={{
												my: 2,
												p: 1.5,
												color: "white",
											}}
											className="button1"
											loading={isLoadingButton}
										>
											Cancel
										</LoadingButton>
									) : (
										<Stack
											direction="column"
											justifyContent={"center"}
											alignItems={"center"}
											sx={{
												my: 5,
												width: 380,
											}}
										>
											<ToggleButtonGroup
												color="primary"
												value={alignment}
												exclusive
												onChange={(_e, value) =>
													setAlignment(value)
												}
												aria-label="Platform"
												size="small"
											>
												<ToggleButton
													value="sell"
													sx={{
														color: "rgb(255,255,255,0.9)",
													}}
													color="error"
												>
													Sell
												</ToggleButton>
												<ToggleButton
													value="transfer"
													sx={{
														color: "rgb(255,255,255,0.9)",
													}}
													color="error"
												>
													Transfer
												</ToggleButton>
											</ToggleButtonGroup>
											<Input
												placeholder={
													alignment === "sell"
														? "price"
														: "address"
												}
												sx={{
													color: "#da3f3f",
													marginY: 3,
												}}
												fullWidth
												autoFocus
												value={value}
												onChange={(e) =>
													setValue(e.target.value)
												}
												color="error"
											/>
											<Stack
												direction="row"
												justifyContent="center"
												spacing={2}
											>
												{alignment === "sell" && (
													<LoadingButton
														onClick={handleApproval}
														loading={
															isLoadingButton
														}
														sx={{
															color: "white",
															p: 1.5,
														}}
														className="button1"
														disabled={isApprovalAll}
													>
														Approve All
													</LoadingButton>
												)}
												<LoadingButton
													onClick={handle}
													sx={{
														color: "white",
														p: 1.5,
													}}
													loading={isLoadingButton}
													disabled={
														!isApprovalAll &&
														alignment === "sell"
													}
													className="button1"
												>
													{alignment === "sell"
														? "Sell"
														: "Transfer"}
												</LoadingButton>
											</Stack>
										</Stack>
									)}
								</Stack>
							</>
						)}
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
