import style from "../css/Similar.module.css";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState, useCallback } from "react";
import ListCard from "../components/ListCard";

export default function Similar({ info }) {
	const [similerList, setSimilerList] = useState([]);
	const prevInfo = useRef(); // 이전값 저장

	const getproductsSim = useCallback(async () => {
		if (prevInfo.current === info) return;
		try {
			let url = `http://localhost:8000/products?category=${info}`;
			let res = await fetch(url);
			let data = await res.json();
			// console.log(data);
			setSimilerList(data);
		} catch (error) {
			console.log(error);
		}

		prevInfo.current = info;
	}, [info]); // 의존성 배열 추가

	useEffect(() => {
		getproductsSim();
	}, [getproductsSim, info]);

	console.log("-----", similerList);

	const prevRef = useRef(null);
	const nextRef = useRef(null);
	return (
		<div>
			<Swiper
				slidesPerView={4}
				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current,
				}}
				onBeforeInit={(swiper) => {
					swiper.params.navigation.prevEl = prevRef.current;
					swiper.params.navigation.nextEl = nextRef.current;
				}}
				spaceBetween={16}
				pagination={{
					clickable: true,
				}}
				modules={[Navigation, Pagination]}
				className={style.bannerList}
			>
				{similerList.map((item) => (
					<SwiperSlide key={item.id}>
						<ListCard item={item} />
					</SwiperSlide>
				))}
			</Swiper>
			<button ref={prevRef} className={style.btnPrev}>
				이전{" "}
			</button>
			<button ref={nextRef} className={style.btnNext}>
				다음
			</button>
		</div>
	);
}
