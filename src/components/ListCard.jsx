import { useNavigate } from "react-router-dom";
import style from "../css/ListCard.module.css";

export default function ListCard({ item }) {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/detail/${item.id}`);
  };

  return (
    <li className={style.ListCard} onClick={goDetail}>
      <div>
        <div className={style.cardImg}>
          <img src={`/img/${item.img} `} alt={item.title} />
        </div>
        <div className={style.cardInfo}>
          <p>{item.title}</p>
          <p>{item.price}원</p>
        </div>
        <span className={style.discount}>{item.discount}%</span>
      </div>
    </li>
  );
}
