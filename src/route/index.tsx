import { Routes, Route } from "react-router-dom";
import Home from "pages/Home.page";
import Mint from "pages/Mint.page";
import Game from "pages/Game.page";

const Routers = () => {
	return (
		<Routes>
			<Route path="/" />
			<Route index element={<Home />} />
			<Route path="/mint" element={<Mint />} />
			<Route path="/play" element={<Game />} />
		</Routes>
	);
};

export default Routers;
