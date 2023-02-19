import { isListByTokenId } from "func/interactGame";
import { getRarityOfTokenId } from "func/interactNft";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const rarityLable = ["common", "uncommon", "rare", "ultra rare", "Epic"];

type NftT = {
	tokenId: string;
	status: boolean;
};

const logoOfRarity = [
	"common.jpg",
	"uncommon.jpg",
	"rare.jpg",
	"ultrarare.jpg",
	"epic.jpg",
];

export const Nft = ({ tokenId, status }: NftT) => {
	const [rarity, setRarity] = useState<string | undefined>();
	const [isListed, setListed] = useState(false);
	useEffect(() => {
		const getfunc = async () => {
			const res = await getRarityOfTokenId(tokenId);
			setRarity(res);
			const _isListed = await isListByTokenId(tokenId);
			setListed(_isListed);
		};
		getfunc();
	}, [tokenId, status]);

	return (
		<Box
			sx={{
				position: "relative",
				overflow: "hidden",
				border: "2px solid rgb(0,0,0,0.3)",
				p: 2,
				borderRadius: 4,
				transition: "scale 0.2s",
				":hover": {
					scale: "1.01",
					cursor: "pointer",
					border: "2px solid #FA4717",
				},
			}}
		>
			<Box sx={{ width: "100%", aspectRatio: "1/1" }}>
				<Box
					component="img"
					src={logoOfRarity[Number(rarity) - 1]}
					alt="image"
					width={"100%"}
				/>
			</Box>
			<Typography
				sx={{ p: 2, typography: { color: "rgb(255,255,255,0.6)" } }}
			>
				ShibaFighter #{tokenId}
			</Typography>
			<small
				className={`text_rarity${rarity}`}
				style={{
					position: "absolute",
					top: 15,
					left: 15,
					padding: "1px 10px",
					fontWeight: 600,
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,
					textTransform: "uppercase",
					color: "#fff",
				}}
			>
				{rarityLable[Number(rarity) - 1]}
			</small>
			{isListed && (
				<small
					style={{
						background: "orange",
						position: "absolute",
						top: 15,
						right: 15,
						padding: "1px 10px",
						fontFamily: "monospace",
						borderBottomLeftRadius: 10,
						borderBottomRightRadius: 10,
						textTransform: "uppercase",
						color: "#fff",
					}}
				>
					selling
				</small>
			)}
		</Box>
	);
};
