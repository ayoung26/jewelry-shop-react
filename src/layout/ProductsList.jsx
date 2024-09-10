import { useDispatch, useSelector } from "react-redux";
import ListCard from "../components/ListCard";
import style from "../css/ProductsList.module.css";
import { fetchProducts } from "../store/productStore";
import { useEffect } from "react";

export default function ProductsList() {
	let dispatch = useDispatch();
	const { items: products, status, error } = useSelector(state => state.productSlice);

	useEffect(() => {
		dispatch(fetchProducts({ page: 1, perPage: 6 }));
	}, [dispatch]);

	if (status === "loading") {
		return <div>로딩중...</div>;
	}
	if (status === "failed") {
		return <div>에러: {error}</div>
	}

	return (
		<section className={style.ProductsList}>
			<h2>신상품 리스트 (6개)</h2>
			<a href="#">전체보기</a>
			<ul className={style.listCon}>
				{products?.map((item) => {
					return <ListCard key={item.id} item={item} />;
				})}
			</ul>
		</section>
	);
}
