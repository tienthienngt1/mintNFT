import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 350,
	maxHeight: "90vh",
	bgcolor: "#302828",
	border: "2px solid #eb0808",
	borderRadius: 4,
	boxShadow: 24,
	p: 4,
};

type ResultModalGameT = {
	open: boolean;
	handleClose: () => void;
	status?: string;
	value?: string;
};

export default function ResultModalGame({
	open,
	handleClose,
	status,
	value,
}: ResultModalGameT) {
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
					<Box sx={style}>
						<Stack
							direction="row"
							justifyContent="center"
							alignItems="center"
							sx={{ width: "100%", height: "100%" }}
							my={5}
						>
							<Typography
								align="center"
								sx={{
									typography: {
										color: "rgb(255,255,255,0.6)",
									},
								}}
							>
								{`You ${status === "1" ? "lose" : "win"}: `}
							</Typography>
							<Typography align="center" color={"error"}>
								{`+${Math.floor(Number(value)) ?? ""}`}
							</Typography>
						</Stack>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
