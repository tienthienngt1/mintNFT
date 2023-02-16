import { Stack } from "@mui/material";
import ButtonCustom from "components/commons/ButtonCustom.component";
import { Link } from "react-router-dom";
const NotFound = () => {
	return (
		<Stack
			direction="row"
			justifyContent={"center"}
			alignItems={"center"}
			my={10}
		>
			<Link to="/">
				<ButtonCustom title="Go to home" />
			</Link>
		</Stack>
	);
};

export default NotFound;
