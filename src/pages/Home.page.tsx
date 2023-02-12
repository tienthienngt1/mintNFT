import AboutHome from "components/home/AboutHome.component";
import ClassHome from "components/home/ClassHome.Component";
import IntroHome from "components/home/IntroHome.component";

const Home = () => {
	return (
		<>
			<IntroHome />
			<ClassHome />
			<AboutHome />
		</>
	);
};

export default Home;
