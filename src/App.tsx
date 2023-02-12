import { useEffect } from "react";
import { useMedia } from "react-use";
import { HashRouter } from "react-router-dom";
import "./app.css";
import Layout from "layout/index.layout";
import Background from "components/commons/Background.component";

export default function App() {
	const width = useMedia("(max-width: 400px)");
	useEffect(() => {
		const ref = document.querySelector("meta[name='viewport']");
		ref?.setAttribute(
			"content",
			width
				? "width=400,shrink-to-fit=no, maximum-scale=0.8"
				: "initial-scale=1, width=device-width"
		);
	}, []);

	return (
		<HashRouter>
			<Layout />
			<Background />
		</HashRouter>
	);
}
