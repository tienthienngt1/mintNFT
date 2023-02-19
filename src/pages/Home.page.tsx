import AboutHome from "components/home/AboutHome.component";
import ClassHome from "components/home/ClassHome.Component";
import FAQHome from "components/home/FAQHome.component";
import HowToBuyHome from "components/home/HowToBuyHome.component";
import IntroHome from "components/home/IntroHome.component";
import RoadmapHome from "components/home/RoadmapHome.component";
import TokenomicHome from "components/home/TokenomicHome.component";
import { useLayoutEffect } from "react";
import Container from "@mui/material/Container";

const Home = () => {
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<Container maxWidth={false}>
			<IntroHome />
			{/* <HowToBuyHome /> */}
			<ClassHome />
			<TokenomicHome />
			<AboutHome />
			<RoadmapHome />
			<FAQHome />
		</Container>
	);
};

export default Home;
