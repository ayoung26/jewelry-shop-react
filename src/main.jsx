import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/my_reset.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./css/App.css";
import { BrowserRouter } from "react-router-dom";
// react-router 상태관리
import { Provider } from 'react-redux'
import { store } from './store/store'

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</StrictMode>
);
