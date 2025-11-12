import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdClose } from "react-icons/md";
import Icon from "../../images/other/icon-carbon-neutral.svg";
import Img from "../../images/other/empty_cart.svg";
import Ready from "../../images/other/icon-order-confirmed.svg";

import CartItem from "./CartItem";
import { deleteAllFromCart } from "../../store/slices/cartSlice";
import { addItemInOrder } from "../../store/slices/orderSlice";

import "../../styles/style.cart.scss";

export default function Cart() {
    const { cart } = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const orderPrice = cart.reduce((acc, cartItem) => {
        return acc + cartItem.price * cartItem.quantity;
    }, 0);

    const cartItemQuantity = cart.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);

    const [isOpen, setIsOpen] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const openModal = () => setIsModal(true);
    const closeModal = () => setIsModal(false);

    const toggleDiv = () => {
        setIsOpen(!isOpen);
    };

    const handleDeleteAllItems = () => {
        dispatch(deleteAllFromCart());
    };

    const handleStartNewOrder = () => {
        closeModal();
        dispatch(deleteAllFromCart());
        cart.forEach((item) => {
            dispatch(
                addItemInOrder({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                })
            );
        });
    };

    useEffect(() => {
        if (isModal && cart.length === 0) {
            setIsModal(false);
        }
    }, [isModal, cart.length]);

    const divText =
        "A carbon-neutral delivery means the net amount of carbon dioxide emissions from the shipping process is zero. This is achieved by both reducing emissions through more efficient methods, like using electric vehicles or optimizing routes, and by offsetting any remaining emissions by investing in environmental projects like tree planting or renewable energy";

    return (
        <section className="cart">
            <div className="cart-title">
                <div className="cart-title__text">
                    Your Cart({cartItemQuantity})
                </div>
                {cart.length > 0 ? (
                    <div
                        className="cart-delete"
                        title="Удалить все товары из корзины"
                        onClick={handleDeleteAllItems}
                    >
                        <MdDelete className="cart-delete__icon" />
                    </div>
                ) : null}
            </div>

            {cart.length ? (
                <>
                    {cart.map((item) =>
                        item.quantity > 0 ? (
                            <CartItem {...item} key={item.id} />
                        ) : null
                    )}
                    <div className="cart-wrapper">
                        <div className="cart-wrapper__title">Order Total</div>
                        <span className="cart-wrapper__cost">{`$${orderPrice}`}</span>
                    </div>

                    <div
                        className="cart-div"
                        onClick={toggleDiv}
                        title="Узнать более подробную информацию"
                    >
                        <img className="cart-div__img" src={Icon} alt="Icon" />
                        <div className="cart-div__text">
                            This is a carbon-neutral delivery
                        </div>
                        {!isOpen ? (
                            <FaRegArrowAltCircleDown className="cart-div__icon" />
                        ) : (
                            <>
                                <FaRegArrowAltCircleUp className="cart-div__icon" />
                                <div className="cart-div__txt">{divText}</div>
                            </>
                        )}
                    </div>

                    <button className="card-button" onClick={openModal}>
                        Confirm Order
                    </button>
                </>
            ) : (
                <>
                    <div className="emptyCart-wrapper">
                        <img
                            className="emptyCart-image"
                            src={Img}
                            alt="Image"
                        />
                    </div>
                    <div className="emptyCart-text">
                        Your added items will appear here
                    </div>
                </>
            )}

            {isModal && (
                <section className="modal-section">
                    <div className="modal-wrapper">
                        <div className="modal-image">
                            <img
                                className="modal-image__done"
                                src={Ready}
                                alt="Done"
                            />
                            <MdClose
                                className="modal-image__close"
                                onClick={closeModal}
                            />
                        </div>
                        <div className="modal-title">Order Confirmed</div>
                        <div className="modal-subtitle">
                            We hope you enjoy your food!
                        </div>
                        {cart.length > 0 ? (
                            <div className="item-wrapper__cart">
                                {cart.map((item) =>
                                    item.quantity > 0 ? (
                                        <CartItem {...item} key={item.id} />
                                    ) : null
                                )}
                                <div className="cart-wrapper__footer">
                                    <div className="cart-footer__title">
                                        Order Total
                                    </div>
                                    <span className="cart-footer__cost">{`$${orderPrice}`}</span>
                                </div>
                            </div>
                        ) : null}
                        <button
                            className="modal-wrapper__button"
                            onClick={handleStartNewOrder}
                        >
                            Start New Order
                        </button>
                    </div>
                </section>
            )}
        </section>
    );
}
