import { Box, Typography, Stack, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2";
import { useState, useContext, useEffect } from "react";
import SelectModalGame from "./SelectModalGame.component";
import { Nft } from "components/mint/CollectionMint.component";
import { Address } from "layout/index.layout";
import { useEventEth } from "hooks/useEventEth";
import Notify from "components/commons/Nofity.component";
import {
	getBalanceOfGame,
	getResult,
	getTurn,
	getValue,
	largeAttack,
	mediumAttack,
	smallAttack,
	withdrawGame,
} from "func/interactGame";
import { getBalance } from "func/interactToken";
import ResultModalGame from "./ResultModalGame.component";

type ZombieT = {
	isLoading: boolean[];
	rarity: number;
	order: number;
	winRate: number;
	keyAttack: number;
	turn: number;
	handleAttack: (key: number) => void;
	url: string;
};

const Zombie = ({
	rarity,
	order,
	winRate,
	keyAttack,
	handleAttack,
	isLoading,
	turn,
	url,
}: ZombieT) => {
	return (
		<>
			<Box
				sx={{
					position: "relative",
					overflow: "hidden",
					":hover": {
						cursor: "pointer",
					},
					paddingBottom: 2,
				}}
			>
				<Box component="img" src={url} alt="image" width={"100%"} />
				<Typography
					sx={{ p: 2, typography: { color: "rgb(255,255,255,0.6)" } }}
				>
					{`Shiba Zombie #${order}`}
				</Typography>
				<Stack direction="row" justifyContent="space-between">
					<Typography
						sx={{
							p: 2,
							typography: { color: "rgb(255,255,255,0.6)" },
						}}
					>
						Win Rate:
					</Typography>
					<Typography
						sx={{
							p: 2,
							typography: { color: "#f02f4f" },
						}}
					>
						{`${winRate}%`}
					</Typography>
				</Stack>
				<Stack direction="row" justifyContent="space-between">
					<Typography
						sx={{
							p: 2,
							typography: { color: "rgb(255,255,255,0.6)" },
						}}
					>
						Turn:
					</Typography>
					<Typography
						sx={{
							p: 2,
							typography: { color: "#f02f4f" },
						}}
					>
						{`-${turn}`}
					</Typography>
				</Stack>
				<Stack direction="row" justifyContent={"center"}>
					<LoadingButton
						variant="contained"
						loading={isLoading[keyAttack]}
						color={"error"}
						onClick={() => handleAttack(keyAttack)}
						sx={{
							"&.Mui-disabled": {
								backgroundColor: "#f86c84",
							},
						}}
					>
						<img
							src="/attack.png"
							alt="battle_shibafighter"
							width={30}
							height={30}
							style={{ marginRight: 10 }}
						/>{" "}
						Attack
					</LoadingButton>
				</Stack>
			</Box>
		</>
	);
};

const listZombie = [
	{
		rarity: 1,
		order: 3,
		winRate: 80,
		turn: 1,
		url: "/easy.jpg",
	},
	{
		rarity: 3,
		order: 2,
		winRate: 65,
		turn: 2,
		url: "/normal.jpg",
	},
	{
		rarity: 5,
		order: 1,
		winRate: 50,
		turn: 3,
		url: "/hard.jpg",
	},
];

const BattleGame = () => {
	const { address, setAddress } = useContext(Address);
	const [tokenId, setTokenId] = useState<string | undefined>();
	const [balance, setBalance] = useState<string | undefined>();
	const [balanceOfGame, setBalanceOfGame] = useState<string | undefined>();
	const [turn, setTurn] = useState<string | undefined>();
	const [toggleStatus, setToggleStatus] = useState(false);
	const [isLoading, setIsLoading] = useState([false, false, false]);
	const [open, setOpen] = useState(false);
	const [resultModel, setResultModel] = useState<{
		open: boolean;
		status?: string;
		value?: string;
	}>({ open: false });

	const [notify, setNotify] = useState<{
		display: boolean;
		text: string;
		severity: "error" | "success";
	}>({ display: false, text: "", severity: "error" });
	const handleCloseNotify = () => setNotify({ ...notify, display: false });

	useEventEth({ address, setAddress });

	const handleOpen = () => {
		if (isLoading.includes(true)) return;
		setOpen(true);
	};
	const handleClose = () => setOpen(false);
	const handleCloseResultModel = () => setResultModel({ open: false });

	const handleAttack = async (key: number) => {
		if (isLoading.includes(true)) return;
		if (!address || !tokenId) {
			setNotify({
				display: true,
				text: "Please select ShibaFighter",
				severity: "error",
			});
			return;
		}
		let res;
		if (key === 0) {
			setIsLoading([true, false, false]);
			res = await smallAttack(address, tokenId);
		}
		if (key === 1) {
			setIsLoading([false, true, false]);
			res = await mediumAttack(address, tokenId);
		}
		if (key === 2) {
			setIsLoading([false, false, true]);
			res = await largeAttack(address, tokenId);
		}
		const result = await getResult(tokenId);
		const value = await getValue(tokenId);
		res && setResultModel({ open: true, status: result, value });
		setToggleStatus(!toggleStatus);
		setIsLoading([false, false, false]);
	};

	const handleWithdraw = async () => {
		if (!address) return;
		const value = await withdrawGame(address);
		setToggleStatus(!toggleStatus);
		if (value) {
			setNotify({
				display: true,
				text: "Withdraw successfully",
				severity: "success",
			});
		}
	};
	useEffect(() => {
		const asyncFunc = async () => {
			if (address) {
				const _amountBalance = await getBalance(address);
				const _balanceOfGame = await getBalanceOfGame(address);
				setBalance(_amountBalance);
				setBalanceOfGame(_balanceOfGame);
			}
			if (tokenId) {
				const amountTurn = await getTurn(tokenId);
				setTurn(amountTurn);
			}
		};
		asyncFunc();
	}, [address, toggleStatus, tokenId]);

	return (
		<>
			<Typography color={"error"} align="right">
				Token Available:
				{balance ? `${Math.floor(Number(balance)) ?? 0}` : "..."}
			</Typography>
			<Typography color={"error"} align="right">
				Token Game:
				{balanceOfGame
					? `${Math.floor(Number(balanceOfGame)) ?? 0}`
					: "..."}
			</Typography>
			<Stack
				direction="row"
				justifyContent={"flex-end"}
				sx={{ marginBottom: 3 }}
			>
				<Button
					variant="contained"
					color="error"
					onClick={handleWithdraw}
				>
					Withdraw
				</Button>
			</Stack>
			<Grid container spacing={2}>
				{listZombie.map((l, k) => (
					<Grid md={4} key={l.winRate + l.rarity}>
						<Zombie
							rarity={l.rarity}
							order={l.order}
							winRate={l.winRate}
							keyAttack={k}
							isLoading={isLoading}
							handleAttack={handleAttack}
							turn={l.turn}
							url={l.url}
						/>
					</Grid>
				))}
			</Grid>
			{tokenId && (
				<>
					<Typography
						align="right"
						sx={{ marginTop: 5 }}
						color="error"
					>
						Turn: {turn ?? 0}
					</Typography>
					<Stack
						direction={"row"}
						justifyContent={"center"}
						sx={{ marginTop: 5 }}
					>
						<Box width={380}>
							<Nft tokenId={tokenId} />
						</Box>
					</Stack>
				</>
			)}
			<Stack
				direction={"row"}
				justifyContent={"center"}
				sx={{ marginTop: 10 }}
			>
				<Button variant="contained" color="error" onClick={handleOpen}>
					{tokenId ? "Change" : "Select ShibaFighter"}
				</Button>
			</Stack>
			<SelectModalGame
				open={open}
				address={address}
				handleClose={handleClose}
				setTokenId={setTokenId}
				tokenId={tokenId}
			/>
			<ResultModalGame
				open={resultModel.open}
				handleClose={handleCloseResultModel}
				status={resultModel.status}
				value={resultModel.value}
			/>
			<Notify
				display={notify.display}
				text={notify.text}
				severity={notify.severity}
				handleClose={handleCloseNotify}
			/>
		</>
	);
};

export default BattleGame;