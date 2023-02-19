import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { getMyTokens } from "func/interactNft";
import { sortArray } from "func/sortArray";
import { Address } from "layout/index.layout";
import { useContext, useEffect, useState } from "react";
import InventoryModalGame from "./InventoryModalGame.component";
import Notify from "components/commons/Nofity.component";
import { tokenIdListedByOwner } from "func/interactGame";
import { Nft } from "components/commons/Nft.component";

const InventoryGame = () => {
	const { address } = useContext(Address);
	const [tokenId, setTokenId] = useState<string[] | undefined>();
	const [tokenIdSelected, setTokenIdSelected] = useState<
		string | undefined
	>();
	const [loading, setLoading] = useState(true);
	const [isOpenModal, setOpenModal] = useState(false);
	const [status, setStatus] = useState(false);

	const [notify, setNotify] = useState<{
		display: boolean;
		text: string;
		severity: "error" | "success";
	}>({ display: false, text: "", severity: "error" });

	const handleSelect = (tokenIdSelected_: string) => () => {
		setOpenModal(true);
		setTokenIdSelected(tokenIdSelected_);
	};

	useEffect(() => {
		if (!address) return;
		const token = async () => {
			const res = await getMyTokens(address);
			const _tokenIdListed = await tokenIdListedByOwner(address);
			const token = res.concat(_tokenIdListed);
			setTokenId(sortArray(token));

			setLoading(false);
			setOpenModal(false);
		};
		token();
	}, [address, status]);

	return (
		<>
			{!address && (
				<Typography
					sx={{
						typography: {
							md: "h3",
							xs: "h5",
							color: "#e04545",
						},
					}}
					align="center"
				>
					Empty
				</Typography>
			)}
			{!loading && (
				<>
					<Grid container spacing={2}>
						{tokenId && tokenId.length > 0 ? (
							tokenId?.map((t, k) => (
								<Grid
									key={t + k}
									md={4}
									lg={3}
									onClick={handleSelect(t)}
								>
									<Nft tokenId={t} status={status} />
								</Grid>
							))
						) : (
							<Typography
								sx={{
									typography: {
										md: "h3",
										xs: "h5",
										opacity: 0.6,
										color: "#e04545",
									},
								}}
								align="center"
							>
								Empty
							</Typography>
						)}
					</Grid>
				</>
			)}

			<InventoryModalGame
				tokenId={tokenIdSelected}
				open={isOpenModal}
				handleClose={() => setOpenModal(false)}
				address={address}
				setNotify={setNotify}
				setStatus={setStatus}
				status={status}
			/>
			<Notify
				display={notify.display}
				text={notify.text}
				severity={notify.severity}
				handleClose={() => setNotify({ ...notify, display: false })}
			/>
		</>
	);
};

export default InventoryGame;
