import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    increaseItemInCart,
    decreaseItemInCart,
} from "../../store/slices/cartSlice";

import Icon from "../../images/other/icon-add-to-cart.svg";

import "../../styles/style.item.scss";

export default function Item({ name, image, category, price, id }) {
    const item = { id, name, category, price };

    const { cart } = useSelector((state) => state.cart);

    const selectCartItem = cart.find((cartItem) => cartItem.id === id);

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(
            increaseItemInCart({
                ...item,
            })
        );
    };

    const handleSubtractToCart = () => {
        dispatch(
            decreaseItemInCart({
                ...item,
            })
        );
    };

    return (
        <section className="item">
            <Link
                to={`/item/${id}`}
                title="Посмотреть подробную информацию о десерте"
            >
                <div className="item-image__container">
                    <img
                        className={
                            "item-image " +
                            `${
                                selectCartItem && selectCartItem.quantity > 0
                                    ? "item-image__active"
                                    : ""
                            }`
                        }
                        src={require(`../../${image}`)}
                        alt="Item image"
                    />
                </div>
            </Link>

            {selectCartItem && selectCartItem.quantity > 0 ? (
                <div className="item-handleDiv">
                    <button
                        className="item-handleDiv__buttonDecrease"
                        onClick={handleSubtractToCart}
                    >
                        -
                    </button>
                    <span className="item-handleDiv__quantity">
                        {selectCartItem.quantity}
                    </span>
                    <button
                        className="item-handleDiv__buttonIncrease"
                        onClick={handleAddToCart}
                    >
                        +
                    </button>
                </div>
            ) : (
                <button className="item-button" onClick={handleAddToCart}>
                    <img
                        className="item-button__icon"
                        src={Icon}
                        alt="Icon for button"
                    />
                    Add to Cart
                </button>
            )}

            <div className="item-category">{category}</div>

            <Link
                to={`/item/${id}`}
                className="link"
                title="Посмотреть подробную информацию о десерте"
            >
                <div className="item-name">{name}</div>
            </Link>

            <div className="item-price">${price}</div>
        </section>
    );
}
