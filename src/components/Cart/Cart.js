import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmout = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1})
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(prevState => !prevState);
  }

  const submitOrderHandler = async(userDetails) => {
    const request = fetch('https://react-https-344f0-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userDetails,
        orderedItems: cartCtx.items
      }),

    })
  }

  const modalActions =  <div className={classes.actions}>
  <button onClick={props.onClose} className={classes["button--alt"]}>
    Close
  </button>
  {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
</div>

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Amount</span>
        <span>{totalAmout}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
