import { Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Nft } from "components/commons/Nft.component";
import { getMyTokens } from "func/interactNft";
import { sortArray } from "func/sortArray";
import { Address } from "layout/index.layout";
import { useContext, useEffect, useState } from "react";
import { Reveal, Tween } from "react-gsap";

type CollectionMintT = {
	status: boolean;
};

const CollectionMint = ({ status }: CollectionMintT) => {
	const { address } = useContext(Address);
	const [tokenId, setTokenId] = useState<string[] | undefined>();
	useEffect(() => {
		if (!address) return;
		const token = async () => {
			const res = await getMyTokens(address);
			if (res.length > 0) {
				setTokenId(sortArray(res));
			} else {
				setTokenId(undefined);
			}
		};
		setTimeout(() => {
			token();
		}, 2000);
	}, [address, status]);
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
					delay={0.5}
				>
					<div>
						<Typography
							sx={{
								typography: {
									md: "h3",
									xs: "h4",
									color: "#cb3232",
								},
							}}
						>
							COLLECTION
						</Typography>
						<Box
							component="img"
							src="/headingUnderline.svg"
							width={{ md: 400, xs: 290 }}
						/>
					</div>
				</Tween>
			</Reveal>
			<Stack
				direction={{ md: "row", xs: "column" }}
				my={10}
				spacing={3}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Grid container spacing={2}>
					{tokenId ? (
						tokenId?.map((t, k) => (
							<Grid key={t + k} md={4} lg={3}>
								<Nft tokenId={t} status={false} />
							</Grid>
						))
					) : (
						<>
							<Reveal>
								<Tween
									from={{
										opacity: 0,
										x: 50,
									}}
									to={{
										opacity: 1,
										x: 0,
									}}
									delay={0.7}
								>
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
								</Tween>
							</Reveal>
						</>
					)}
				</Grid>
			</Stack>
		</>
	);
};

export default CollectionMint;
