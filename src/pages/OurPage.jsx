import { Link, Outlet } from "react-router-dom";

export default function OurPage() {
	return (
		<div className="mw">
			<h2>Our Page</h2>
			<nav style={{ padding: "50px", textAlign: "center" }}>
				<Link to="/our/ceo">CEO</Link>
				<Link to="/our/history">History</Link>
				<Link to="/our/org">organization</Link>
			</nav>
			{/* <div>
        최종 컨텐츠 들어가는 부분
      </div> */}
			<Outlet />
			<div style={{ padding: "50px" }}>공통요소</div>
		</div>
	);
}
