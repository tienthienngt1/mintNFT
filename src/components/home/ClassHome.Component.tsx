import { Typography, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCards, Pagination, Navigation } from "swiper";
import { Tween, Reveal } from "react-gsap";
import { useRef } from "react";

const rarityLable = ["common", "uncommon", "rare", "ultra rare", "Epic"];
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
						CLASS
					</Typography>
					<img
						src="/headingUnderline.svg"
						width={150}
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
									key={r + k}
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
											src="/logo1.jpg"
											width={{ md: 500, xs: 360 }}
											alt="image"
										/>
										<Typography
											variant="h3"
											sx={{ p: 2 }}
											align="center"
											color="rgb(255,255,255,0.8)"
										>
											{r}
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
