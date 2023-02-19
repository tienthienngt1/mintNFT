import "style/button.css";

//@ts-ignore
interface Button2T
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	title: string | React.ReactNode;
	onClick: any;
}

const Button2 = ({ title, onClick }: Button2T) => {
	return (
		<button onClick={onClick} className="button2" role="button">
			{title}
		</button>
	);
};

export default Button2;
