import MainGame from "components/game/MainGame.component";
import { useLayoutEffect } from "react";

const Game = () => {
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<MainGame />
		</>
	);
};

export default Game;
