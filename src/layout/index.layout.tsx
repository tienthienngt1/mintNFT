import Container from "@mui/material/Container";
import Footer from "components/commons/Footer.component";
import Header from "components/commons/Header.component";
import { createContext, useState } from "react";
import Routers from "route";
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
				<Container maxWidth="xl">
					<Header setAddress={setAddress} address={address} />
					<Routers />
					<Footer />
				</Container>
			</Address.Provider>
		</>
	);
};

export default Layout;
