import "style/loadingMarketplace.css";
import { Stack } from "@mui/material";

const LoadingMarketplace = () => {
	return (
		<Stack direction="row" justifyContent="center" my={10}>
			<div className="loading-marketplace">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</Stack>
	);
};

export default LoadingMarketplace;
