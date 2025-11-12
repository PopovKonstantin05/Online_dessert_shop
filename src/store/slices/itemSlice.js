import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_ROUTE = "http://localhost:3001/items";

//асинхронно получаем данные с сервера
export const fetchItems = createAsyncThunk(
    "items/setItems",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(API_ROUTE);
            if (!res.ok)
                throw new Error("Ошибка загрузки данных по указанному пути!!!");

            const data = await res.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const itemSlice = createSlice({
    name: "items",
    initialState: {
        items: [], //все товары
        filteredItems: [],

        visibleItems: [], //показываемые товары
        visibleCount: 9, //сколько показываем сейчас
        step: 9, //сколько подгружаем при нажатии на кнопку
        hasMoreItems: true, //есть ли еще товары для показа

        sortPriceOrder: "default", //сортировка по цене
        sortNameOrder: "default", //сортировка по названию
        sortCategories: [],

        isLoading: false,
        error: null,
    },
    reducers: {
        loadMoreItems: (state) => {
            const newCountVisibleItems = state.visibleCount + state.step;
            state.visibleCount = newCountVisibleItems;

            state.visibleItems = state.items.slice(0, newCountVisibleItems);

            state.hasMoreItems = newCountVisibleItems < state.items.length;
        },

        resetVisibleItems: (state) => {
            state.visibleCount = state.step;
            state.visibleItems = state.items.slice(0, state.step);
            state.hasMoreItems = state.step < state.items.length;
        },

        setSortPriceOrder: (state, action) => {
            state.sortPriceOrder = action.payload;
        },

        setSortNameOrder: (state, action) => {
            state.sortNameOrder = action.payload;
        },

        sortPriceItems: (state) => {
            const items = [...state.items];

            switch (state.sortPriceOrder) {
                case "asc":
                    items.sort((a, b) => a.price - b.price);
                    break;

                case "desc":
                    items.sort((a, b) => b.price - a.price);
                    break;

                case "default":
                    break;
            }

            state.visibleItems = items;
            state.filteredItems = items;
            state.hasMoreItems = false;
        },

        sortNameItems: (state) => {
            const items = [...state.items];

            switch (state.sortNameOrder) {
                case "asc":
                    items.sort((a, b) => a.name.localeCompare(b.name));
                    break;

                case "desc":
                    items.sort((a, b) => b.name.localeCompare(a.name));
                    break;

                case "default":
                    break;
            }

            state.visibleItems = items;
            state.filteredItems = items;
            state.hasMoreItems = false;
        },

        setCategories: (state, action) => {
            const category = action.payload;

            if (state.sortCategories.includes(category)) {
                state.sortCategories = state.sortCategories.filter(
                    (item) => item !== category
                );
            } else {
                state.sortCategories.push(category);
            }
        },

        sortItemsByCategories: (state) => {
            const filteredItems = state.filteredItems.filter((item) => {
                if (state.sortCategories.includes(item.category)) return item;
            });

            state.visibleItems = filteredItems;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
            state.filteredItems = state.items;

            state.visibleItems = action.payload.slice(0, state.step);
            state.visibleCount = state.step;
            state.hasMoreItems = state.step < action.payload.length;
        });
        builder.addCase(fetchItems.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
        });
    },
});

export const {
    loadMoreItems,
    resetVisibleItems,
    setSortPriceOrder,
    setSortNameOrder,
    sortPriceItems,
    sortNameItems,
    setCategories,
    sortItemsByCategories,
} = itemSlice.actions;
export default itemSlice.reducer;
