import { Swiper, SwiperSlide } from "swiper/react";

import style from "../css/BannerList.module.css";
import { Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";

export default function BannerList() {
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	return (
		<section className={style.BannerList}>
			<h2 hidden>배너 리스트</h2>
			<Swiper
				slidesPerView={1}
				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current,
				}}
				onBeforeInit={(swiper) => {
					swiper.params.navigation.prevEl = prevRef.current;
					swiper.params.navigation.nextEl = nextRef.current;
				}}
				spaceBetween={30}
				pagination={{
					clickable: true,
				}}
				modules={[Navigation, Pagination]}
				className={style.bannerList}
			>
				<SwiperSlide>
					<div className={style.list}>
						<p>배너 제목1</p>
						<img src="/img/Img_bg1.jpg" alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={style.list}>
						<p>배너 제목2</p>
						<img src="/img/Img_bg2.jpg" alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={style.list}>
						<p>배너 제목3</p>
						<img src="/img/Img_bg3.jpg" alt="" />
					</div>
				</SwiperSlide>
			</Swiper>
			<button ref={prevRef} className={style.btnPrev}>
				이전{" "}
			</button>
			<button ref={nextRef} className={style.btnNext}>
				다음
			</button>
		</section>
	);
}
