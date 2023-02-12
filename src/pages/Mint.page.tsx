import { Stack } from "@mui/material";
import CollectionMint from "components/mint/CollectionMint.component";
import LogoMint from "components/mint/LogoMint.component";
import MainMint from "components/mint/MainMint.component";
import { useState } from "react";
import { Reveal, Tween } from "react-gsap";
const Mint = () => {
	const [status, setStatus] = useState<boolean>(false);
	return (
		<>
			<Stack direction="row" justifyContent={"center"}>
				<Stack
					direction={{ md: "row", xs: "column-reverse" }}
					spacing={4}
					justifyContent="space-around"
					alignItems={"center"}
					p={2}
					my={5}
				>
					<MainMint setStatus={setStatus} status={status} />

					<Reveal>
						<Tween
							from={{
								opacity: 0,
								x: 50,
							}}
							to={{
								opacity: 1,
								x: 0,
							}}
							delay={0.5}
						>
							<div>
								<LogoMint />
							</div>
						</Tween>
					</Reveal>
				</Stack>
			</Stack>
			<CollectionMint status={status} />
		</>
	);
};

export default Mint;
