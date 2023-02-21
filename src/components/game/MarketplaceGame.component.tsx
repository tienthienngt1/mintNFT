import { Box, Typography, Stack, Pagination } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
	allNftListed,
	allNftListedByPrice,
	getInfoTokenListed,
} from "func/interactGame";
import { getRarityOfTokenId } from "func/interactNft";
import { useContext, useEffect, useState } from "react";
import MarketplaceModalGame from "./MarketplaceModalGame.component";
import { Address } from "layout/index.layout";
import Container from "@mui/material/Container";
import LoadingMarketplace from "components/commons/LoadingMarketplace.component";

type NftT = {
	tokenId: string;
	price: any;
	setOpenModel: (value: any) => void;
};

const rarityLable = ["common", "uncommon", "rare", "ultra rare", "Epic"];
const logoOfRarity = [
	"common.jpg",
	"uncommon.jpg",
	"rare.jpg",
	"ultrarare.jpg",
	"epic.jpg",
];

const Nft = ({ tokenId, setOpenModel, price }: NftT) => {
	const [rarity, setRarity] = useState<string | undefined>();
	const [info, setInfo] = useState<any>([]);

	const handleSelect = () => {
		setOpenModel({ open: true, tokenId: tokenId, owner: info[0], price });
	};

	useEffect(() => {
		const getfunc = async () => {
			const res = await getRarityOfTokenId(tokenId);
			const _info = await getInfoTokenListed(tokenId);
			setInfo(_info);
			setRarity(res);
		};
		getfunc();
	}, [tokenId]);

	return (
		<>
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
				onClick={handleSelect}
			>
				<Box sx={{ aspectRatio: "1/1" }}>
					<Box
						component="img"
						src={logoOfRarity[Number(rarity) - 1]}
						alt="image"
						width={"100%"}
						height={"100%"}
					/>
				</Box>
				<Typography
					sx={{ typography: { color: "rgb(255,255,255,0.6)" } }}
				>
					ShibaFighter
				</Typography>
				<Typography
					sx={{ typography: { color: "rgb(255,255,255,0.6)" } }}
				>
					#{tokenId}
				</Typography>
				<Typography
					gutterBottom
					sx={{ fontFamily: "fantasy", marginTop: 2 }}
				>
					Price
				</Typography>
				<Stack direction={"row"} justifyContent={"space-between"}>
					<Typography gutterBottom sx={{ fontFamily: "fantasy" }}>
						<span style={{ color: "#cb3232" }}>{`${(
							Number(info[2]) /
							10 ** 9
						).toLocaleString()}`}</span>
						&nbsp;&nbsp;ShibaF
					</Typography>
					{info[3] !== "0" && (
						<Typography gutterBottom sx={{ fontFamily: "fantasy" }}>
							{`Last Sale: `}
							<small style={{ color: "#cb3232" }}>
								{`${(
									Number(info[3]) /
									10 ** 9
								).toLocaleString()}`}
							</small>
						</Typography>
					)}
				</Stack>
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
			</Box>
		</>
	);
};

export type MkPlaceT = {
	setNotify: React.Dispatch<
		React.SetStateAction<{
			display: boolean;
			text: string;
			severity: "error" | "success";
		}>
	>;
};
const MarketplaceGame = ({ setNotify }: MkPlaceT) => {
	const { address } = useContext(Address);
	const [loading, setLoading] = useState(true);
	const [openModel, setOpenModel] = useState<any>();
	const [data, setData] = useState<any>();

	useEffect(() => {
		(async () => {
			let arr: any = [];
			const _allListed = await allNftListed();
			const _allListedPrice = await allNftListedByPrice();
			for (let i in _allListed) {
				if (_allListed[i] !== "0") {
					const _rarity = await getRarityOfTokenId(_allListed[i]);
					arr.push({
						tokenId: _allListed[i],
						price: _allListedPrice[i],
						rarity: _rarity,
					});
				}
			}
			let _dataSort = arr.sort(
				(a: any, b: any) => Number(a.price) - Number(b.price)
			);
			setData(_dataSort);
			setLoading(false);
		})();
	}, []);

	console.log(data);

	return (
		<Container maxWidth={false}>
			<>
				{/* <Box my={20}>
			<Typography
				sx={{
					typography: {
						md: "h2",
						xs: "h4",
						color: "#cb3232",
					},
				}}
				align="center"
			>
				COMING SOON
			</Typography>
		</Box> */}

				<Stack
					direction="row"
					alignItems="center"
					sx={{
						overflowX: "auto",
						"&::-webkit-scrollbar": { display: "none" },
						msOverflowStyle: "none",
						scrollbarWidth: "none",
					}}
				>
					<Stack
						direction="column"
						alignItems="center"
						justifyContent={"center"}
						minWidth={100}
					>
						<Typography sx={{ fontFamily: "fantasy" }}>
							Floor price
						</Typography>
						<Typography color="#cb3232">{`${Number(
							data?.[0]?.price ?? 0
						).toLocaleString()}`}</Typography>
					</Stack>
					<Stack
						direction="column"
						alignItems="center"
						justifyContent={"center"}
						minWidth={100}
					>
						<Typography sx={{ fontFamily: "fantasy" }}>
							Total Supply
						</Typography>
						<Typography>2000</Typography>
					</Stack>
					<Stack
						direction="column"
						alignItems="center"
						justifyContent={"center"}
						minWidth={120}
					>
						<Typography sx={{ fontFamily: "fantasy" }}>
							Listed
						</Typography>
						<Typography color="green">
							{isNaN((data?.length / 2000) * 100)
								? 0
								: (data?.length / 2000) * 100 + "%"}
						</Typography>
					</Stack>
				</Stack>
				{loading && <LoadingMarketplace />}
				{!loading && (
					<>
						{data?.length > 0 ? (
							<>
								<Grid container spacing={2} my={1}>
									{data?.map((t: string, k: number) => {
										if (t === "0") return;
										return (
											<Grid key={t + k} md={4} lg={3}>
												<Nft
													tokenId={data[k].tokenId}
													setOpenModel={setOpenModel}
													price={data[k].price}
												/>
											</Grid>
										);
									})}
								</Grid>
								{/* <Stack
									spacing={2}
									justifyContent={"center"}
									alignItems={"center"}
								>
									<Pagination
										count={0}
										variant="outlined"
										shape="rounded"
										sx={{ button: { color: "white" } }}
										color="primary"
									/>
								</Stack> */}
							</>
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
					</>
				)}
			</>
			<MarketplaceModalGame
				owner={openModel?.owner}
				price={openModel?.price}
				tokenId={openModel?.tokenId}
				open={openModel?.open}
				handleClose={() => setOpenModel({ ...openModel, open: false })}
				address={address}
				setNotify={setNotify}
			/>
		</Container>
	);
};

export default MarketplaceGame;
