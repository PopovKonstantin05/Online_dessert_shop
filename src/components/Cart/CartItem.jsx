import { useDispatch } from "react-redux";

import IconDelete from "../../images/other/icon-remove-item.svg";

import "../../styles/style.cartItem.scss";

import { deleteFromCart } from "../../store/slices/cartSlice";

export default function CartItem({ name, price, quantity, id }) {
    const cartItem = { id, name, price, quantity };

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(
            deleteFromCart({
                ...cartItem,
            })
        );
    };

    return (
        <div className="cart-products">
            <div className="product-title">{name}</div>
            <div className="product-icon" onClick={handleDelete}>
                <img
                    className="product-delete"
                    src={IconDelete}
                    alt="Delete Icon"
                />
            </div>
            <div className="product-wrapper">
                <span className="product-quantity">{`${quantity}x`}</span>
                <span className="product-price">{`@ ${price}$`}</span>
                <span className="product-allprice">{`${
                    price * quantity
                }$`}</span>
            </div>
        </div>
    );
}
