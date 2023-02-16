const Loading = () => {
	return (
		<div
			style={{
				width: "100%",
				display: "grid",
				placeContent: "center",
				height: "100vh",
				zIndex: 10,
			}}
		>
			<span className="loader"></span>
		</div>
	);
};

export default Loading;
