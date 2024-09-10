import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/productStore";
import style from "../css/DetailPage.module.css";
import TabStyle from "../layout/TabStyle";
import Similar from "../layout/Similar";
import DetailModal from "../components/DetailModal";

export default function DetailPage() {
	const { id } = useParams();
	const dispatch = useDispatch();

	const {
		singleProduct: products,
		status,
		error,
	} = useSelector((state) => state.productSlice);
	const [count, setCount] = useState(1);

	// modal --- start
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// modal --- end

	useEffect(() => {
		// fetchSingleProduct 액션을 디스패치
		dispatch(fetchSingleProduct(parseInt(id)));
	}, [dispatch, id]);

	const increment = () => {
		count < 10
			? setCount((prev) => prev + 1)
			: alert("최대 수량은 10개 입니다.");
	};
	const decrement = () => {
		count > 1
			? setCount((prev) => prev - 1)
			: alert("최소 수량은 1개 입니다.");
	};

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "failed") {
		return <div>Error: {error}</div>;
	}

	// product가 없을 때의 처리
	if (!products) {
		return <div>Product not found</div>;
	}

	return (
		<section className={`${style.DetailPage} mw`}>
			<h2 hidden>Detail Page</h2>
			<div className={style.productCon}>
				<div className={style.imgCon}>
					<img src={`/img/${products?.img}`} alt={products?.title} />
				</div>
				<div className={style.pInfo}>
					<p>
						상품명 : {products?.title} / {products?.category}
					</p>
					<p>가격 : {Number(products?.price).toLocaleString()}원</p>
					<p>할인률 : {products?.discount} %</p>
					<div className={style.count}>
						{count === 1 ? (
							<button disabled>-</button>
						) : (
							<button onClick={decrement}>-</button>
						)}

						<span>{count}</span>
						{count === 10 ? (
							<button disabled>+</button>
						) : (
							<button onClick={increment}>+</button>
						)}
					</div>
					<button onClick={handleShow}>장바구니</button>
				</div>
			</div>
			<TabStyle />
			<Similar info={products?.category} />
			<DetailModal
				show={show}
				handleClose={handleClose}
				products={products}
				count={count}
			/>
		</section>
	);
}
