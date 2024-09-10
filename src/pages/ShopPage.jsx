import style from "../css/ShopPage.module.css";
import ListCard from "../components/ListCard";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productStore";

const SORT_OPTIONS = {
	latest: "",
	lowPrice: "price",
	highPrice: "-price",
	discount: "-discount",
};

const SORT_LABELS = {
	latest: "최신순",
	lowPrice: "낮은가격순",
	highPrice: "높은가격순",
	discount: "높은할인율",
};

const CATEGORY_OPTIONS = {
	all: "",
	new: "new",
	top: "top",
};

export default function ShopPage() {

	let dispatch = useDispatch();
	const { items: products, status, error, moreInfo } = useSelector(state => state.productSlice);

	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(() =>
		parseInt(searchParams.get("page") || "1", 10)
	);

	const [sortType, setSortType] = useState(
		() => searchParams.get("sort") || "latest"
	);

	const [category, setCategory] = useState(
		() => searchParams.get("category") || "all"
	);

	const loadProducts = useCallback(() => {
		dispatch(
			fetchProducts({
				page: 1,
				perPage: currentPage * 8,
				sort: SORT_OPTIONS[sortType],
				category: CATEGORY_OPTIONS[category]
			})
		);
		setSearchParams({
			page: currentPage.toString(),
			sort: sortType,
			category,
		});
	}, [currentPage, setSearchParams, sortType, category, dispatch]);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	const handleSort = (t) => {
		setSortType(t);
		setCurrentPage(1);
	};

	// 카테고리 변경 핸들러 수정
	const handleCategory = (c) => {
		setCategory(c);
		setSortType("latest"); // 정렬을 최신순으로 초기화
		setCurrentPage(1);
	};

	const loadMore = () => {
		setCurrentPage((prev) => prev + 1);
	};

	if (status === "loading") {
		return <div>로딩중...</div>;
	}
	if (status === "failed") {
		return <div>에러: {error}</div>
	}

	return (
		<main className={`${style.ShopPage} mw`}>
			<h2>Shop Page</h2>
			<nav>
				{/* 카테고리 버튼 */}
				{Object.entries(CATEGORY_OPTIONS).map(([key]) => (
					<button
						key={key}
						className={`${style.btnCate} ${category === key ? style.active : ""
							}`}
						onClick={() => handleCategory(key)}
					>
						{key === "all"
							? "전체상품"
							: key === "new"
								? "신상품"
								: "히트상품"}
					</button>
				))}
				<hr />
				{/* 정렬 버튼 */}
				{Object.entries(SORT_OPTIONS).map(([key]) => (
					<button
						key={key}
						onClick={() => handleSort(key)}
						className={sortType === key ? style.active : ""}
					>
						{SORT_LABELS[key]}
					</button>
				))}
			</nav>
			<ul className={style.listCon}>
				{products.map((item) => (
					<ListCard key={item.id} item={item} />
				))}
			</ul>

			{moreInfo.next !== null && (
				<button onClick={loadMore}>더 보기</button>
			)}
		</main>
	);
}
