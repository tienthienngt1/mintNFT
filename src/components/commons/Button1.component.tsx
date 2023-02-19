import "style/button.css";

//@ts-ignore
interface Button1T
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	title: string | React.ReactNode;
}

const Button1 = ({ title, ...rest }: Button1T) => {
	return (
		<button {...rest} className="button1" role="button">
			{title}
		</button>
	);
};

export default Button1;
