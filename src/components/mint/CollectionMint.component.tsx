import { Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { getMyTokens, getRarityOfTokenId } from "func/getInfoNft";
import { Address } from "layout/index.layout";
import { useContext, useEffect, useState } from "react";

const rarityLable = ["common", "uncommon", "rare", "ultra rare", "Epic"];

type NftT = {
	tokenId: string;
};

const Nft = ({ tokenId }: NftT) => {
	const [rarity, setRarity] = useState<string | undefined>();
	useEffect(() => {
		const getfunc = async () => {
			const res = await getRarityOfTokenId(tokenId);
			setRarity(res);
		};
		getfunc();
	}, [tokenId]);

	return (
		<Box
			width={{ md: "30%", xs: "90%" }}
			className={`container_rarity${rarity}`}
			sx={{
				position: "relative",
				borderRadius: 5,
				overflow: "hidden",
				":hover": {
					cursor: "pointer",
				},
			}}
		>
			<Box component="img" src="/logo1.jpg" alt="image" width={"100%"} />
			<Typography sx={{ p: 2, typography: {} }}>
				ShibaFighter #{tokenId}
			</Typography>
			<small
				className={`text_rarity${rarity}`}
				style={{
					position: "absolute",
					top: 5,
					left: 5,
					padding: "1px 10px",
					fontWeight: 600,
					borderRadius: 10,
					textTransform: "uppercase",
					color: "#fff",
				}}
			>
				{rarityLable[Number(rarity) - 1]}
			</small>
		</Box>
	);
};

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
				setTokenId(res);
			} else {
				setTokenId(undefined);
			}
		};
		token();
	}, [address, status]);
	return (
		<>
			<Typography
				sx={{ typography: { md: "h3", xs: "h4", color: "#cb3232" } }}
			>
				COLLECTION
			</Typography>
			<Box
				component="img"
				src="/headingUnderline.svg"
				width={{ md: 400, xs: 290 }}
			/>
			<Stack
				direction={{ md: "row", xs: "column" }}
				my={10}
				spacing={3}
				justifyContent={"center"}
				alignItems={"center"}
			>
				{tokenId ? (
					tokenId.map((t, k) => <Nft tokenId={t} key={t + k} />)
				) : (
					<>
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
					</>
				)}
			</Stack>
		</>
	);
};

export default CollectionMint;
