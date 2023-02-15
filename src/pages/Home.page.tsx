import AboutHome from "components/home/AboutHome.component";
import ClassHome from "components/home/ClassHome.Component";
import FAQHome from "components/home/FAQHome.component";
import IntroHome from "components/home/IntroHome.component";
import TokenomicHome from "components/home/TokenomicHome.component";
import { useLayoutEffect } from "react";

const Home = () => {
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<IntroHome />
			<ClassHome />
			<TokenomicHome />
			<AboutHome />
			<FAQHome />
		</>
	);
};

export default Home;
