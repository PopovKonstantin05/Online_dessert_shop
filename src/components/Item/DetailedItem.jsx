import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import "../../styles/style.detaileditem.scss";
import { MdClose } from "react-icons/md";
import { increaseItemInCart } from "../../store/slices/cartSlice";

export default function DetailedItem() {
    const { id } = useParams();

    const { items } = useSelector((state) => state.item);
    const { cart } = useSelector((state) => state.cart);

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    const handleAddItem = ({ id, name, category, price }) => {
        dispatch(increaseItemInCart({ id, name, category, price }));
    };

    return (
        <section className="item-wrapper">
            <div className="item-close">
                <Link to="/">
                    <MdClose className="item-close__icon" />
                </Link>
            </div>
            <div className="itemDetailed">
                {items.map((item) =>
                    id === item.id ? (
                        <div key={id}>
                            <div className="itemDetailed-detailed">
                                <div className="itemDetailed-image">
                                    <img
                                        className="itemDetailed-img"
                                        src={require(`../../${item.image}`)}
                                        alt="Item image"
                                    />
                                </div>
                                <div className="itemDetailed-container">
                                    <div className="itemDetailed-name">
                                        {item.name}
                                    </div>
                                    <div className="itemDetailed-price">
                                        Price - <span>{item.price}</span>$
                                    </div>
                                    <div className="itemDetailed-weight">
                                        Portion weight -{" "}
                                        <span>{item.weight}</span> grams
                                    </div>
                                    <div className="itemDetailed-calories">
                                        <span>{item.calories}</span> calories in{" "}
                                        <span>100</span> grams
                                    </div>
                                    {cart.find(
                                        (cartItem) => cartItem.id === id
                                    ) ? (
                                        <div className="itemDetailed-inCart">
                                            Dessert is in your cart
                                        </div>
                                    ) : (
                                        <button
                                            className="itemDetailed-notInCart"
                                            onClick={() => handleAddItem(item)}
                                        >
                                            Add dessert to cart
                                        </button>
                                    )}
                                    <div className="itemDetailed-ingredients">
                                        <div className="itemDetailed-ingredients__title">
                                            Composition:
                                        </div>
                                        <div className="itemDetailed-ingredients__ing">
                                            {item.ingredients}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {!isOpen ? (
                                <div
                                    className="itemDetailed-description"
                                    onClick={() => setIsOpen(true)}
                                >
                                    <div className="itemDetailed-description__title">
                                        View <span>{item.name}</span> description
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="itemDetailed-description"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="itemDetailed-description__title">
                                        <span>{item.name}</span> description
                                    </div>
                                    <div className="itemDetailed-descriptionn">
                                        {item.description}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : null
                )}
            </div>
        </section>
    );
}
