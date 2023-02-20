import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { sortArray } from "func/sortArray";
import { getMyTokens } from "func/interactNft";
import { Radio, Stack } from "@mui/material";
import { Nft } from "components/commons/Nft.component";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { md: 900, xs: 390 },
	maxHeight: "90vh",
	bgcolor: "#302828",
	border: "2px solid #eb0808",
	borderRadius: 4,
	boxShadow: 24,
	p: 4,
	overflowY: "scroll",
};

type SelectModalGameT = {
	open: boolean;
	handleClose: () => void;
	setTokenId: React.Dispatch<React.SetStateAction<string | undefined>>;
	tokenId: string | undefined;
	address: string | undefined;
};

export default function SelectModalGame({
	open,
	handleClose,
	setTokenId,
	tokenId,
	address,
}: SelectModalGameT) {
	const [myNft, setMyNft] = useState<string[] | undefined>();

	const handleSelectNft = (id: string) => {
		setTokenId(id);
		handleClose();
	};
	useEffect(() => {
		if (!address) return;
		const token = async () => {
			setTokenId(undefined);
			const res = await getMyTokens(address);
			if (res.length > 0) {
				setMyNft(sortArray(res));
			} else {
				setMyNft(undefined);
			}
		};
		token();
	}, [address]);
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
					<Box sx={style} className="hidden-bar">
						<Stack
							direction="row"
							justifyContent={"center"}
							alignItems="center"
							sx={{ marginBottom: 3 }}
						>
							<img
								src="/bag.png"
								alt="inventory_"
								width={30}
								height={30}
								style={{ marginRight: 10 }}
							/>{" "}
							<Typography
								id="transition-modal-title"
								variant="h6"
								component="h2"
								color="error"
								align="center"
							>
								Inventory
							</Typography>
						</Stack>
						<Grid container spacing={2}>
							{myNft && myNft?.length > 0 ? (
								myNft?.map((t, k) => (
									<Grid
										onClick={() => handleSelectNft(t)}
										key={t + k}
										xs={12}
										md={4}
									>
										<Nft tokenId={t} status={false} />
										<Stack
											direction={"row"}
											justifyContent={"center"}
										>
											<Radio
												checked={t === tokenId}
												sx={{
													"&.Mui-checked": {
														color: "red",
													},
												}}
											/>
										</Stack>
									</Grid>
								))
							) : (
								<Stack
									direction="row"
									justifyContent="center"
									sx={{ width: "100%" }}
									my={2}
								>
									<Typography align="center" color={"info"}>
										Empty
									</Typography>
								</Stack>
							)}
						</Grid>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
