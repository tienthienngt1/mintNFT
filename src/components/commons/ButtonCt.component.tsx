import { Button } from "@mui/material";

type ButtonCtT = {
	title: string | React.ReactNode;
	onClick?: () => void;
};

const ButtonCt = ({ title, onClick }: ButtonCtT) => {
	return (
		<Button
			onClick={onClick}
			variant="contained"
			sx={{
				":hover": {
					boxShadow: "0px 0px 10px 0px red",
				},
				background: "linear-gradient(136deg, #5976f5 0%, #fc5347 100%)",
				boxShadow: "0px 0px 10px 0px #5976f5",
				transition: "0.4s",
			}}
		>
			{title}
		</Button>
	);
};

export default ButtonCt;
