import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';

export default function DetailModal({ show, handleClose, products, count }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const addItemToCart = (goto = false) => {
    dispatch(
      addItem({
        id: products.id,
        title: products.title,
        img: products.img,
        price: products.price,
        category: products.category,
        discount: products.discount,
        count,
      }
      ));
    handleClose();
    if (goto) navigate("/cart");
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>장바구니 담기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>고객님께서 선택하신 상품은 [{products?.title}] 입니다.</p>
          <p>수량은 {count}개 입니다.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={() => { addItemToCart() }}>장바구니에 담기</Button>
          <Button variant="primary" onClick={() => { addItemToCart(true) }}>장바구니로 이동</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
