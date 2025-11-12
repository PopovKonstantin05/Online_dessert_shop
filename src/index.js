import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import AppRoutes from "./components/routes/AppRoutes";
import { persistor, store } from "./store/store";
import "./styles/style.index.scss";
import "./fonts/fonts.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <div className="index-wrapper">
                    <AppRoutes />
                </div>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
