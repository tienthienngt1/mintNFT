import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import { BrowserRouter } from "react-router-dom";
import "./app.css";
import Layout from "layout/index.layout";
import Background from "components/commons/Background.component";
import Loading from "components/commons/Loading.component";
import "./MuiClassNameSetup.js";

export default function App() {
	const width = useMedia("(max-width: 400px)");
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		const ref = document.querySelector("meta[name='viewport']");
		ref?.setAttribute(
			"content",
			width
				? "width=400,shrink-to-fit=no, maximum-scale=0.8"
				: "initial-scale=1, width=device-width"
		);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<BrowserRouter>
					<Layout />
					<Background />
				</BrowserRouter>
			)}
		</>
	);
}
