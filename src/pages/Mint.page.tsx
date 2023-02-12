import { Stack } from "@mui/material";
import Notify from "components/commons/Nofity.component";
import CollectionMint from "components/mint/CollectionMint.component";
import LogoMint from "components/mint/LogoMint.component";
import MainMint from "components/mint/MainMint.component";
import { useState } from "react";
const Mint = () => {
	const [status, setStatus] = useState<boolean>(false);
	return (
		<>
			<Stack direction="row" justifyContent={"center"}>
				<Stack
					direction={{ md: "row", xs: "column-reverse" }}
					spacing={2}
					justifyContent="space-around"
					p={5}
					my={5}
				>
					<MainMint setStatus={setStatus} status={status} />
					<LogoMint />
				</Stack>
			</Stack>
			<CollectionMint status={status} />
		</>
	);
};

export default Mint;
