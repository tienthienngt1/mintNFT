import { Typography, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCards, Pagination, Navigation } from "swiper";
import { Tween, Reveal } from "react-gsap";

const rarityLable = [
	{
		name: "common",
		url: "/common.jpg",
	},
	{
		name: "uncommon",
		url: "/uncommon.jpg",
	},
	{
		name: "rare",
		url: "/rare.jpg",
	},
	{
		name: "ultra rare",
		url: "/ultrarare.jpg",
	},
	{
		name: "Epic",
		url: "/epic.jpg",
	},
];
const ClassHome = () => {
	return (
		<>
			<Reveal>
				<Tween
					from={{
						opacity: 0,
						x: -50,
					}}
					to={{
						opacity: 1,
						x: 0,
					}}
					delay={0.5}
				>
					<Typography
						sx={{
							typography: {
								md: "h4",
								xs: "h4",
								color: "#cb3232",
							},
						}}
					>
						CLASSES
					</Typography>
					<img
						src="/headingUnderline.svg"
						width={200}
						style={{ marginBottom: "20px" }}
					/>
				</Tween>
			</Reveal>
			<Reveal>
				<Tween
					from={{
						opacity: 0,
						y: 50,
					}}
					to={{
						opacity: 1,
						y: 0,
					}}
					delay={0.5}
				>
					<div>
						<Swiper
							effect={"cards"}
							grabCursor={true}
							pagination={true}
							modules={[EffectCards, Pagination, Navigation]}
						>
							{rarityLable.map((r, k) => (
								<SwiperSlide
									key={r.name + k}
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Box
										className={`background_rarity${
											k + 1
										} container_rarity${k + 1}`}
										sx={{
											borderRadius: 5,
											overflow: "hidden",
											":hover": {
												cursor: "pointer",
											},
										}}
										width={{ md: 500, xs: 360 }}
									>
										<Box
											component="img"
											src={r.url}
											width={{ md: 500, xs: 360 }}
											alt="image"
										/>
										<Typography
											variant="h3"
											sx={{ p: 2 }}
											align="center"
											color="rgb(255,255,255,0.8)"
										>
											{r.name}
										</Typography>
									</Box>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</Tween>
			</Reveal>
		</>
	);
};

export default ClassHome;
