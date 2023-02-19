import Container from "@mui/material/Container";
import Footer from "components/commons/Footer.component";
import Header from "components/commons/Header.component";
import { createContext, useState } from "react";
import Routers from "route";
import Box from "@mui/material/Box";
type AddressT = {
	address: string | undefined;
	setAddress:
		| React.Dispatch<React.SetStateAction<string | undefined>>
		| undefined;
};
export const Address = createContext<AddressT>({
	address: undefined,
	setAddress: undefined,
});

const Layout = () => {
	const [address, setAddress] = useState<string | undefined>();
	return (
		<>
			<Address.Provider value={{ address, setAddress }}>
				<div style={{ minHeight: "100vh", position: "relative" }}>
					<Header setAddress={setAddress} address={address} />
					<Routers />
					<Footer />
					<Box
						component="img"
						src="/kech.png"
						sx={{
							position: "absolute",
							top: 0,
							width: "100vw",
							left: 0,
							zIndex: -1,
						}}
					/>
					<Box
						component="img"
						src="/kech.png"
						sx={{
							position: "absolute",
							bottom: 0,
							width: "100vw",
							left: 0,
							zIndex: -1,
							transform: "rotate(180deg)",
						}}
					/>
				</div>
			</Address.Provider>
		</>
	);
};

export default Layout;
