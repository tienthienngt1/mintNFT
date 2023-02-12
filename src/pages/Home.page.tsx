import AboutHome from "components/home/AboutHome.component";
import ClassHome from "components/home/ClassHome.Component";
import IntroHome from "components/home/IntroHome.component";
import { useLayoutEffect } from "react";

const Home = () => {
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<IntroHome />
			<ClassHome />
			<AboutHome />
		</>
	);
};

export default Home;
