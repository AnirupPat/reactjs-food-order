import cartContext from './cart-context';

const CartProvider = props => {
    return (
        <cartContext.Provider>{props.children}</cartContext.Provider>
    );
}

export default CartProvider;
