import { Routes, Route } from "react-router-dom";
import Home from "pages/Home.page";
import Mint from "pages/Mint.page";
import Game from "pages/Game.page";
import NotFound from "pages/NotFound.page";

const Routers = () => {
	return (
		<Routes>
			<Route path="/" />
			<Route index element={<Home />} />
			<Route path="/mint" element={<Mint />} />
			<Route path="/play" element={<Game />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Routers;
