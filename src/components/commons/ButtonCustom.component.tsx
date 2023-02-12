type ButtonCustomT = {
	title: string;
};

const ButtonCustom = ({ title }: ButtonCustomT) => {
	return <button className="button_mint">{title}</button>;
};

export default ButtonCustom;
