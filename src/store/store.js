import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { itemSlice } from "./slices/itemSlice";
import { cartSlice } from "./slices/cartSlice";
import { orderSlice } from "./slices/orderSlice";

const persistConfig = {
    key: "root",
    storage,

    whitelist: ["item", "cart"],
};

const reducers = combineReducers({
    item: itemSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);
