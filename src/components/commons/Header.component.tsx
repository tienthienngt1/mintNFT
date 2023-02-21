import {
	Stack,
	Box,
	Typography,
	Menu,
	Fade,
	MenuItem,
	IconButton,
	Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEventEth } from "hooks/useEventEth";
import { connectWallet } from "func/connectWallet";
import { useMedia } from "react-use";
import { useState } from "react";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import Button1 from "./Button1.component";

const MenuSmallScreen = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<IconButton
				id="fade-button"
				aria-controls={open ? "fade-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				<ThreeDotsVertical style={{ color: "red" }} />
			</IconButton>
			<Menu
				id="fade-menu"
				MenuListProps={{
					"aria-labelledby": "fade-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				<MenuItem onClick={handleClose}>
					<Link
						to="/"
						style={{
							display: "flex",
							gap: 10,
							alignItems: "center",
						}}
					>
						Home
					</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link
						to="/play"
						style={{
							display: "flex",
							gap: 10,
							alignItems: "center",
						}}
					>
						Battle
					</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link
						to="/mint"
						style={{
							display: "flex",
							gap: 10,
							alignItems: "center",
						}}
					>
						Mint
					</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link
						to="https://docs.shibafighter.org/"
						style={{
							display: "flex",
							gap: 10,
							alignItems: "center",
						}}
						target="_blank"
					>
						WhitePaper
					</Link>
				</MenuItem>
			</Menu>
		</>
	);
};

type HeaderT = {
	address: string | undefined;
	setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Header = ({ setAddress, address }: HeaderT) => {
	const width = useMedia("(max-width: 900px)");
	useEventEth({ address, setAddress });
	const handleConnect = async () => {
		const res = await connectWallet();
		if (res) setAddress(res);
	};
	return (
		<>
			<Alert severity="warning" sx={{ my: 1 }}>
				<Typography
					sx={{
						overflowWrap: "break-word",
						fontFamily: "fantasy",
						color: "rgb(0,0,0,0.7)",
					}}
					align="center"
				>
					Contract SHIBAF: 0xEff1C15Dd81FFe9CB04a898Ba06c7CE871dBDEB6
				</Typography>
			</Alert>

			<Stack
				direction={"row"}
				justifyContent={{ md: "space-between", xs: "space-around" }}
				alignItems={"center"}
				px={{ lg: 15, md: 2 }}
				sx={{
					aspectRatio: "1452/120",
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundImage: {
						lg: "url('/header-bg.png')",
						xs: "none",
					},
				}}
			>
				<Link
					to="/"
					style={{ display: "flex", gap: 10, alignItems: "center" }}
				>
					<Box
						component="img"
						src="/backgroundLogo.jpg"
						alt="logo"
						width={80}
						height={60}
					/>
					{!width && (
						<Typography
							sx={{
								typography: {
									md: "h5",
									xs: "h6",
									color: "#cb3232",
								},
							}}
							gutterBottom
						>
							SHIBAFIGHTER
						</Typography>
					)}
				</Link>
				<Stack direction={"row"} spacing={2}>
					{!width && (
						<>
							<Link to="/play">
								<Button1 title="Play" />
							</Link>
							<Link to="/mint">
								<Button1 title="Mint" />
							</Link>
							<Link
								to="https://docs.shibafighter.org/"
								target="_blank"
							>
								<Button1 title="WhitePaper" />
							</Link>
						</>
					)}
					<Button1
						onClick={handleConnect}
						title={
							address
								? `${address.substring(0, 4)}...${address.slice(
										-4
								  )}`
								: `Connect`
						}
					/>
					{width && <MenuSmallScreen />}
				</Stack>
			</Stack>
		</>
	);
};

export default Header;
