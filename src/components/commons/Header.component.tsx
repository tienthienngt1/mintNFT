import {
	Stack,
	Box,
	Button,
	Typography,
	Menu,
	Fade,
	MenuItem,
	IconButton,
} from "@mui/material";
import ButtonCt from "./ButtonCt.component";
import { Link } from "react-router-dom";
import { useEventEth } from "hooks/useEventEth";
import { connectWallet } from "func/connectWallet";
import { useMedia } from "react-use";
import { useState } from "react";
import { ThreeDotsVertical } from "react-bootstrap-icons";

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
			</Menu>
		</>
	);
};

type HeaderT = {
	address: string | undefined;
	setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Header = ({ setAddress, address }: HeaderT) => {
	const width = useMedia("(max-width: 600px)");
	useEventEth({ address, setAddress });
	const handleConnect = async () => {
		const res = await connectWallet();
		if (res) setAddress(res);
	};
	return (
		<>
			<Stack
				direction={"row"}
				justifyContent={{ md: "space-between", xs: "space-around" }}
				alignItems={"center"}
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
								<ButtonCt title="Play" />
							</Link>
							<Link to="/mint">
								<ButtonCt title="Mint" />
							</Link>
						</>
					)}
					<ButtonCt
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
