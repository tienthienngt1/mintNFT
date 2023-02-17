import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Input, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Nft } from "components/mint/CollectionMint.component";
import { useState } from "react";
import ButtonCt from "components/commons/ButtonCt.component";

const Transfer = () => {
	return (
		<>
			<Input
				placeholder="Address"
				sx={{ color: "#da3f3f", marginY: 3 }}
				fullWidth
				color="error"
			/>
			<ButtonCt title="Transfer" />
		</>
	);
};

const Sell = () => {
	return (
		<>
			<Input
				placeholder="address"
				sx={{ color: "#da3f3f", marginY: 5 }}
				fullWidth
				color="error"
			/>
			<Input
				placeholder="price"
				sx={{ color: "#da3f3f", marginBottom: 2 }}
				fullWidth
				color="error"
			/>
			<ButtonCt title="Sell" />
		</>
	);
};

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
	tokenId?: string;
};

export default function InvetoryModalGame({
	open,
	handleClose,
	tokenId,
}: InvetoryModalT) {
	const [alignment, setAlignment] = useState("sell");

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
					<Box sx={style} width={{ md: 700, xs: 400 }}>
						<Stack
							direction="column"
							justifyContent="center"
							alignItems="center"
							sx={{ width: "100%", height: "100%" }}
							my={5}
						>
							<Box width={380}>
								<Nft tokenId={tokenId} />
							</Box>
							<Stack
								direction="row"
								justifyContent={"center"}
								sx={{ marginBottom: 5 }}
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
										sx={{ color: "rgb(255,255,255,0.9)" }}
										color="error"
									>
										Sell
									</ToggleButton>
									<ToggleButton
										value="transfer"
										sx={{ color: "rgb(255,255,255,0.9)" }}
										color="error"
									>
										Transfer
									</ToggleButton>
								</ToggleButtonGroup>
							</Stack>
							{alignment === "sell" ? <Sell /> : <Transfer />}
						</Stack>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
