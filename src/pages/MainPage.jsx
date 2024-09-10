import BannerList from "../layout/BannerList";
import ProductsList from "../layout/ProductsList";

export default function MainPage() {
	return (
		<main className="mw">
			<BannerList />
			<ProductsList />
		</main>
	);
}
