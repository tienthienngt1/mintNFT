import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	Stack,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { getMyTokens } from "func/interactNft";
import { sortArray } from "func/sortArray";
import { Address } from "layout/index.layout";
import { Fragment, useContext, useEffect, useState } from "react";
import InventoryModalGame from "./InventoryModalGame.component";
import Notify from "components/commons/Nofity.component";
import { tokenIdListedByOwner } from "func/interactGame";
import { Nft } from "components/commons/Nft.component";
import LoadingMarketplace from "components/commons/LoadingMarketplace.component";

const listFilter = [
	{
		label: "All",
		value: "all",
	},
	{
		label: "Common",
		value: "1",
	},
	{
		label: "Uncommon",
		value: "2",
	},
	{
		label: "Rare",
		value: "3",
	},
	{
		label: "Ultrarare",
		value: "4",
	},
	{
		label: "Epic",
		value: "5",
	},
];

const InventoryGame = () => {
	const { address } = useContext(Address);
	const [tokenId, setTokenId] = useState<string[] | undefined>();
	const [tokenIdSelected, setTokenIdSelected] = useState<
		string | undefined
	>();
	const [loading, setLoading] = useState(true);
	const [isOpenModal, setOpenModal] = useState(false);
	const [status, setStatus] = useState(false);
	const [filterRarity, setFilterRarity] = useState<string[]>([
		"1",
		"2",
		"3",
		"4",
		"5",
	]);

	const [notify, setNotify] = useState<{
		display: boolean;
		text: string;
		severity: "error" | "success" | "info";
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
			{!address ? (
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
			) : loading ? (
				<LoadingMarketplace />
			) : (
				<>
					{/* <FormGroup row defaultValue={"all"} sx={{ m: 2 }}>
						{listFilter.map((a) => (
							<FormControlLabel
								key={a.value}
								checked
								control={<Checkbox color="error" />}
								label={a.label}
								value={a.value}
								sx={{ path: { fill: "#f73403dd" } }}
							/>
						))}
					</FormGroup> */}
					<Grid
						container
						spacing={2}
						sx={{ display: "flex", justifyContent: "center" }}
					>
						{tokenId && tokenId.length > 0 ? (
							tokenId?.map((t, k) => (
								<Fragment key={t + k}>
									<Grid
										md={4}
										lg={3}
										onClick={handleSelect(t)}
									>
										<Nft tokenId={t} status={status} />
									</Grid>
								</Fragment>
							))
						) : (
							<Typography
								my={3}
								sx={{
									typography: {
										md: "h3",
										xs: "h5",
										opacity: 0.6,
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
			{isOpenModal && (
				<InventoryModalGame
					tokenId={tokenIdSelected}
					open={isOpenModal}
					handleClose={() => setOpenModal(false)}
					address={address}
					setNotify={setNotify}
					setStatus={setStatus}
					status={status}
				/>
			)}
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
