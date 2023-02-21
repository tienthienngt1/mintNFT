import {
	Box,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { Stack } from "@mui/material";
import { Shop, ShopWindow } from "react-bootstrap-icons";
import BattleGame from "./BattleGame.component";
import InventoryGame from "./InventoryGame.component";
import MarketplaceGame from "./MarketplaceGame.component";
import Notify from "components/commons/Nofity.component";

type NavT = {
	alignment: string;
	setAlignment: React.Dispatch<React.SetStateAction<string>>;
};

const Nav = ({ alignment, setAlignment }: NavT) => {
	const handleChange = (
		_event: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setAlignment(newAlignment);
	};
	return (
		<Stack direction="row" justifyContent={"center"} my={2}>
			<ToggleButtonGroup
				color="primary"
				value={alignment}
				exclusive
				onChange={handleChange}
				aria-label="Platform"
				size="small"
			>
				<ToggleButton
					value="battle"
					sx={{ color: "rgb(255,255,255,0.9)" }}
					color="error"
				>
					<img
						src="/battle.png"
						alt="battle_shibafighter"
						width={30}
						height={30}
						style={{ marginRight: 10 }}
					/>{" "}
					Battle
				</ToggleButton>
				<ToggleButton
					value="inventory"
					sx={{ color: "rgb(255,255,255,0.9)" }}
					color="error"
				>
					<img
						src="/bag.png"
						alt="battle_shibafighter"
						width={30}
						height={30}
						style={{ marginRight: 10 }}
					/>{" "}
					Inventory
				</ToggleButton>
				<ToggleButton
					value="marketplace"
					sx={{ color: "rgb(255,255,255,0.9)" }}
					color="error"
				>
					<img
						src="/marketplace.png"
						alt="battle_shibafighter"
						width={30}
						height={30}
						style={{ marginRight: 10 }}
					/>{" "}
					Marketplace
				</ToggleButton>
			</ToggleButtonGroup>
		</Stack>
	);
};

const MainGame = () => {
	const [alignment, setAlignment] = useState("inventory");
	const [notify, setNotify] = useState<{
		display: boolean;
		text: string;
		severity: "error" | "success";
	}>({ display: false, text: "", severity: "error" });
	return (
		<>
			<Nav alignment={alignment} setAlignment={setAlignment} />
			{alignment === "battle" ? (
				<BattleGame />
			) : alignment === "inventory" ? (
				<InventoryGame />
			) : (
				<MarketplaceGame setNotify={setNotify} />
			)}
			<Notify
				display={notify.display}
				text={notify.text}
				severity={notify.severity}
				handleClose={() => setNotify({ ...notify, display: false })}
			/>
		</>
	);
};

export default MainGame;
