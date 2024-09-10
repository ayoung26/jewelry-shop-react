import { useDispatch, useSelector } from "react-redux";
import style from "../css/CartPage.module.css";
import { changeName, changeAge } from "../store/userStore";
import { increase, decrease, deleteItem } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
	let user = useSelector((state) => state.userSlice);
	let cart = useSelector((state) => state.cartSlice);
	let stock = useSelector((state) => state.stockSlice.products);
	let dispatch = useDispatch();
	let navigate = useNavigate();

	return (
		<section className="mw">
			<h2>장바구니</h2>
			<p>
				{user.name}
				<button onClick={() => dispatch(changeName("소미"))}>이름바꾸기</button>
				/ {user.age}
				<button onClick={() => dispatch(changeAge(10))}>나이바꾸기</button>
			</p>
			<p>{stock}</p>
			<hr />
			<table className={style.cartTable}>
				<colgroup>
					<col width="100px" />
					<col width="*" />
					<col width="150px" />
					<col width="100px" />
					<col width="150px" />
					<col width="100px" />
				</colgroup>
				<thead>
					<tr>
						<th>ID</th>
						<th>상품명 + 이미지 + 옵션 내용</th>
						<th>상품가격</th>
						<th>상품수량</th>
						<th>결제금액</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{cart.length === 0 && (
						<tr>
							<td colSpan={6}>
								장바구니에 담긴 상품이 없습니다.
							</td>
						</tr>
					)}

					{cart.map((item) => {
						return (
							<tr key={item.id} >
								<th>{item.id}</th>
								<td className={style.pImg}>
									<div onClick={() => { navigate(`/detail/${item.id}`); }}>
										<p>
											<img src={`/img/${item.img}`} alt="{item.title}" />
										</p>
										<span>{item.title}</span>
									</div>
								</td>
								<td className={style.right}>{Number(item.price).toLocaleString()}원</td>
								<td className={style.center}>
									{item.count === 1 ? (
										<button disabled>-</button>
									) : (
										<button onClick={() => { dispatch(decrease(item.id)) }}>
											-
										</button>
									)}
									{item.count}
									<button onClick={() => { dispatch(increase(item.id)) }}>
										+
									</button>
								</td>
								<td className={style.right}>{Number(item.price * item.count).toLocaleString()}원</td>
								<td className={style.center}>
									<button onClick={() => { dispatch(deleteItem(item.id)) }}>삭제</button>
								</td>
							</tr>
						);
					})}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={6}>
							총 결제 금액 :
							{Number(cart.reduce((a, b) => {
								return a + b.price * b.count
							}, 0)).toLocaleString()}
							원
						</td>
					</tr>
				</tfoot>
			</table>
		</section >
	);
}
