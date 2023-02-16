import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Nft } from "components/mint/CollectionMint.component";
import { getMyTokens } from "func/interactNft";
import { sortArray } from "func/sortArray";
import { Address } from "layout/index.layout";
import { useContext, useEffect, useState } from "react";

const InventoryGame = () => {
	const { address } = useContext(Address);
	const [tokenId, setTokenId] = useState<string[] | undefined>();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!address) return;
		const token = async () => {
			const res = await getMyTokens(address);
			if (res.length > 0) {
				setTokenId(sortArray(res));
			} else {
				setTokenId(undefined);
			}
			setLoading(false);
		};
		token();
	}, [address]);
	return (
		<>
			<Stack
				direction={{ md: "row", xs: "column" }}
				my={10}
				spacing={3}
				justifyContent={"center"}
				alignItems={"center"}
			>
				{!address && (
					<Typography
						sx={{
							typography: {
								md: "h3",
								xs: "h5",
								color: "#e04545",
							},
						}}
					>
						Empty
					</Typography>
				)}
				{!loading && (
					<Grid container spacing={2}>
						{tokenId ? (
							tokenId?.map((t, k) => (
								<Grid key={t + k} md={4} lg={3}>
									<Nft tokenId={t} />
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
							>
								Empty
							</Typography>
						)}
					</Grid>
				)}
			</Stack>
		</>
	);
};

export default InventoryGame;
