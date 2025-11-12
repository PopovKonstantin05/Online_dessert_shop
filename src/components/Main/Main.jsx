import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
    fetchItems,
    loadMoreItems,
    resetVisibleItems,
    setCategories,
    setSortNameOrder,
    sortItemsByCategories,
    sortNameItems,
} from "../../store/slices/itemSlice";
import Item from "../Item/Item";
import {
    setSortPriceOrder,
    sortPriceItems,
} from "../../store/slices/itemSlice";

import "../../styles/style.main.scss";
import { TbFilterSearch } from "react-icons/tb";
import { FcClearFilters } from "react-icons/fc";
import { MdClose } from "react-icons/md";

export default function Main() {
    const { items, visibleItems, isLoading, hasMoreItems, sortCategories } =
        useSelector((state) => state.item);

    const dispatch = useDispatch();

    const [isFilters, setIsFilters] = useState(false);

    const [selectedPriceValue, setSelectedPriceValue] = useState("default");
    const [selectedNameValue, setSelectedNameValue] = useState("default");

    const uniqueCategory = [...new Set(items.map((item) => item.category))];

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleLoadMoreItems = () => {
        dispatch(loadMoreItems());
    };

    const handleResetItems = () => {
        dispatch(resetVisibleItems());
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleButtonClick = () => {
        if (selectedNameValue !== "default") {
            dispatch(setSortNameOrder(selectedNameValue));
            dispatch(sortNameItems());
        }

        if (selectedPriceValue !== "default") {
            dispatch(setSortPriceOrder(selectedPriceValue));
            dispatch(sortPriceItems());
        }

        dispatch(sortItemsByCategories());
        setIsFilters(false);
    };

    return (
        <section className="main">
            <div className="main-header">
                <div className="main-title">Desserts</div>
                {!visibleItems.length ? null : (
                    <>
                        <div
                            title="Перейти к фильтрам"
                            className="main-filters"
                        >
                            <TbFilterSearch
                                className="main-filters__icon"
                                onClick={() => setIsFilters(true)}
                            />
                        </div>
                        <div
                            className="main-filters__clear"
                            title="Очистить фильтры"
                        >
                            <FcClearFilters
                                className="main-clearFilters__icon"
                                onClick={() => dispatch(resetVisibleItems())}
                            />
                        </div>
                    </>
                )}
            </div>

            <div className="main-wrapper">
                {isLoading ? <div>Loading products...</div> : null}

                {!visibleItems.length ? (
                    <div className="main-error">
                        There are currently no matching products in stock.
                        Please check back later!
                    </div>
                ) : (
                    visibleItems.map((item) => <Item {...item} key={item.id} />)
                )}
            </div>

            {!visibleItems.length ? null : (
                <div className="additional-wrapper">
                    {hasMoreItems ? (
                        <button
                            className="button-loadMore"
                            onClick={handleLoadMoreItems}
                        >
                            Load more desserts
                        </button>
                    ) : (
                        <>
                            <div className="div-noDesserts">
                                You have viewed all desserts
                            </div>
                            <button
                                className="button-reset"
                                onClick={handleResetItems}
                            >
                                Return to top
                            </button>
                        </>
                    )}
                </div>
            )}
            {isFilters && (
                <section className="filters">
                    <div className="filters-wrap">
                        <div className="filters-header">
                            <div className="filters-title">
                                Dessert filtering
                            </div>
                            <MdClose
                                className="filters-icon"
                                onClick={() => setIsFilters(false)}
                            />
                        </div>
                        <div className="filters-wrapper">
                            <table className="filters-table">
                                <tbody>
                                    <tr className="filters-table__tr">
                                        <th className="filters-table__th1">
                                            Dessert category
                                        </th>
                                        <th className="filters-table__th2">
                                            {uniqueCategory.map((itemCat) => (
                                                <button
                                                    className={
                                                        sortCategories.includes(
                                                            itemCat
                                                        )
                                                            ? "button-categories__active"
                                                            : "button-categories"
                                                    }
                                                    key={itemCat}
                                                    onClick={() =>
                                                        dispatch(
                                                            setCategories(
                                                                itemCat
                                                            )
                                                        )
                                                    }
                                                >
                                                    {itemCat}
                                                </button>
                                            ))}
                                        </th>
                                    </tr>
                                    <tr className="filters-table__tr">
                                        <th className="filters-table__th1">
                                            Dessert name
                                        </th>
                                        <th className="filters-table__th2">
                                            <select
                                                className="filters-table__select"
                                                value={selectedNameValue}
                                                onChange={(e) =>
                                                    setSelectedNameValue(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {selectedPriceValue !==
                                                "default" ? (
                                                    <option value="default">
                                                        Default
                                                    </option>
                                                ) : (
                                                    <>
                                                        <option value="default">
                                                            Default
                                                        </option>
                                                        <option value="asc">
                                                            Ascending name
                                                        </option>
                                                        <option value="desc">
                                                            Descending name
                                                        </option>
                                                    </>
                                                )}
                                            </select>
                                        </th>
                                    </tr>
                                    <tr className="filters-table__tr">
                                        <th className="filters-table__th1">
                                            Sort by price
                                        </th>
                                        <th className="filters-table__th2">
                                            <select
                                                className="filters-table__select"
                                                value={selectedPriceValue}
                                                onChange={(e) =>
                                                    setSelectedPriceValue(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {selectedNameValue !==
                                                "default" ? (
                                                    <option value="default">
                                                        Default
                                                    </option>
                                                ) : (
                                                    <>
                                                        <option value="default">
                                                            Default
                                                        </option>
                                                        <option value="asc">
                                                            Ascending order
                                                        </option>
                                                        <option value="desc">
                                                            Descending order
                                                        </option>
                                                    </>
                                                )}
                                            </select>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>

                            <button
                                className="filters-button"
                                onClick={handleButtonClick}
                            >
                                Apply filters
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </section>
    );
}
