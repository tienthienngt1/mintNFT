import { Box, Typography, Stack, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2";
import { useState, useContext, useEffect } from "react";
import SelectModalGame from "./SelectModalGame.component";
import { Nft } from "components/commons/Nft.component";
import { Address } from "layout/index.layout";
import { useEventEth } from "hooks/useEventEth";
import Notify from "components/commons/Nofity.component";
import {
	getBalanceOfGame,
	getResult,
	getNowOfToken,
	getTurn,
	getValue,
	largeAttack,
	mediumAttack,
	smallAttack,
	withdrawGame,
} from "func/interactGame";
import { getBalance } from "func/interactToken";
import ResultModalGame from "./ResultModalGame.component";
import { Clock } from "react-bootstrap-icons";
import { convertStoH } from "func/convertStoH";
import Button1 from "components/commons/Button1.component";
import Container from "@mui/material/Container";

type ZombieT = {
	isLoading: boolean[];
	order: number;
	winRate: number;
	keyAttack: number;
	turn: number;
	handleAttack: (key: number) => void;
	url: string;
};

const Zombie = ({
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
				<Typography sx={{ p: 2 }}>
					{`Shiba Zombie #${order}`}
				</Typography>
				<Stack direction="row" justifyContent="space-between">
					<Typography
						sx={{
							p: 2,
						}}
					>
						Win Rate:
					</Typography>
					<Typography
						sx={{
							p: 2,
							typography: { color: "#F93D14" },
						}}
					>
						{`${winRate}%`}
					</Typography>
				</Stack>
				<Stack direction="row" justifyContent="space-between">
					<Typography
						sx={{
							p: 2,
						}}
					>
						Turn:
					</Typography>
					<Typography
						sx={{
							p: 2,
							typography: { color: "#F93D14" },
						}}
					>
						{`-${turn}`}
					</Typography>
				</Stack>
				<Stack direction="row" justifyContent={"center"}>
					<LoadingButton
						className="button1"
						loading={isLoading[keyAttack]}
						onClick={() => handleAttack(keyAttack)}
						sx={{
							p: 1.5,
							color: "white",
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

type TimeResetTurn = {
	time: string | undefined;
};

const TimeResetTurn = ({ time }: TimeResetTurn) => {
	const [time_, setTime] = useState<number>(0);
	useEffect(() => {
		if (time === "0") return;
		setTime(86400 - Number(time));
	}, [time]);
	useEffect(() => {
		if (!time_) return;
		if (time_ < 1) return;
		const id = setInterval(() => {
			setTime(time_ - 1);
		}, 1000);
		return () => {
			clearInterval(id);
		};
	}, [time_]);
	if (time === "0") return <></>;
	return (
		<Stack
			direction="row"
			justifyContent={"flex-end"}
			alignItems={"center"}
		>
			<Typography
				sx={{
					typography: {
						fontFamily:
							'"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;',
					},
				}}
				color="#20db1a"
			>
				{time_ ? convertStoH(time_) : ""}
			</Typography>
			<Clock style={{ marginLeft: 10, color: "#20db1a" }} />
		</Stack>
	);
};

const BattleGame = () => {
	const { address, setAddress } = useContext(Address);
	const [tokenId, setTokenId] = useState<string | undefined>();
	const [balance, setBalance] = useState<string | undefined>();
	const [balanceOfGame, setBalanceOfGame] = useState<string | undefined>();
	const [turn, setTurn] = useState<string | undefined>();
	const [toggleStatus, setToggleStatus] = useState(false);
	const [isLoading, setIsLoading] = useState([false, false, false]);
	const [open, setOpen] = useState(false);
	const [timeResetTurn, setTimeResetTurn] = useState<string | undefined>();
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
		if (turn === "0") {
			setNotify({
				display: true,
				text: "Turn is over",
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
				const timeOfToken = await getNowOfToken(tokenId);
				setTimeResetTurn(timeOfToken);
			}
		};
		asyncFunc();
	}, [address, toggleStatus, tokenId]);

	return (
		<>
			<Container
				maxWidth={false}
				sx={{
					backgroundImage: "url('/battle-bg.jpg')",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
				}}
			>
				<Typography color={"error"} align="right">
					ShibaF Available:
					{balance ? `${Math.floor(Number(balance)) ?? 0}` : "..."}
				</Typography>
				<Typography color={"error"} align="right">
					ShibaF Reward:
					{balanceOfGame
						? `${Math.floor(Number(balanceOfGame)) ?? 0}`
						: "..."}
				</Typography>
				<Stack
					direction="row"
					justifyContent={"flex-end"}
					sx={{ marginBottom: 3 }}
					spacing={3}
				>
					<Button
						className="button1"
						sx={{ p: 1.5, color: "white" }}
						onClick={handleWithdraw}
					>
						Withdraw
					</Button>
				</Stack>
				<Grid container spacing={2}>
					{listZombie.map((l, k) => (
						<Grid md={4} key={l.winRate + l.rarity}>
							<Zombie
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
			</Container>
			{tokenId && (
				<Container maxWidth={false}>
					<Typography
						align="right"
						sx={{ marginTop: 5 }}
						color="error"
					>
						Turn: {turn ?? 0}
					</Typography>
					<TimeResetTurn time={timeResetTurn} />
					<Stack
						direction={"row"}
						justifyContent={"center"}
						sx={{ marginTop: 5 }}
					>
						<Box width={380}>
							<Nft tokenId={tokenId} status={false} />
						</Box>
					</Stack>
				</Container>
			)}
			<Stack
				direction={"row"}
				justifyContent={"center"}
				sx={{ marginTop: 10 }}
			>
				<Button1
					title={tokenId ? "Change" : "Select ShibaFighter"}
					onClick={handleOpen}
				/>
			</Stack>
			{open && (
				<SelectModalGame
					open={open}
					address={address}
					handleClose={handleClose}
					setTokenId={setTokenId}
					tokenId={tokenId}
				/>
			)}
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
