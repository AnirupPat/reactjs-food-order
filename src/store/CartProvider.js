import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(state.item === 'ADD') {
        const updatesItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + (action.item.amount * action.item.price);
        return {
            item: updatesItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState;
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const handleAddItemToCart = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item
        })
    }

    const handleRemoveItemFromCart = id => {
        dispatchCartAction({
            type: 'REMOVE',
            id
        })
    }

    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: handleAddItemToCart,
        removeItem: handleRemoveItemFromCart
    }
    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    );
}

export default CartProvider;
