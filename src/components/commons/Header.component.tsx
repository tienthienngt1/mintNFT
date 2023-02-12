import { Stack, Box } from "@mui/material";
import ButtonCt from "./ButtonCt.component";
import { Link } from "react-router-dom";
import { useEventEth } from "hooks/useEventEth";
import { connectWallet } from "func/connectWallet";
import { useMedia } from "react-use";

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
				justifyContent={{ md: "space-between", xs: "center" }}
				alignItems={"center"}
				height={100}
			>
				<Link to="/">
					<Box
						component="img"
						src="https://images.cooltext.com/5643413.png"
						alt="logo"
						width="100%"
					/>
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
								: `Connect Wallet`
						}
					/>
				</Stack>
			</Stack>
		</>
	);
};

export default Header;
