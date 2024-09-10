import { Route, Routes } from "react-router-dom";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import MainPage from "./pages/MainPage";
import ShopPage from "./pages/ShopPage";
import BlogPage from "./pages/BlogPage";
import OurPage from "./pages/OurPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";

function App() {
	// const [products, setProducts] = useState([]);
	// const [moreInfo, setMoreInfo] = useState({});

	// const location = useLocation();
	// const BASE_URL = "http://localhost:8000/products";

	// const getProducts = useCallback(
	// 	async (page = 1, perPage = 6, sort = "", category = "") => {
	// 		try {
	// 			// URL 구성 수정: 카테고리 파라미터 추가
	// 			let url = `${BASE_URL}?_page=${page}&_per_page=${perPage}&_sort=${sort}`;
	// 			if (category) {
	// 				url += `&category=${category}`;
	// 			}
	// 			let res = await fetch(url);
	// 			let data = await res.json();
	// 			setMoreInfo({
	// 				first: data.first,
	// 				prev: data.prev,
	// 				next: data.next,
	// 				last: data.last,
	// 				page: data.page,
	// 				total: data.items,
	// 			});
	// 			setProducts(data.data);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	},
	// 	[]
	// );

	// useEffect(() => {
	// 	if (location.pathname === "/shop") {
	// 		getProducts(1, 8, "latest");
	// 	} else if (location.pathname === "/") {
	// 		getProducts(1, 6);
	// 	}
	// }, [location.pathname, getProducts]);

	return (
		<div className="wrap">
			<Header />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route
					path="/shop"
					element={
						<ShopPage />
					}
				/>
				<Route path="/blog" element={<BlogPage />} />
				<Route path="/our" element={<OurPage />}>
					<Route path="ceo" element={"CEO 페이지"} />
					<Route path="history" element={"History 페이지"} />
					<Route path="org" element={"Organization 페이지"} />
				</Route>
				<Route path="/search" element={"검색페이지"} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/mypage" element={"마이페이지"} />
				<Route path="/detail/:id" element={<DetailPage />} />

				<Route
					path="*"
					element={
						<section
							style={{
								height: "100vh",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "lightgray",
							}}
						>
							내용이 없어요
						</section>
					}
				/>
			</Routes>

			<Footer />
		</div>
	);
}

export default App;
