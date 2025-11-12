import Cart from "./components/Cart/Cart";
import Main from "./components/Main/Main";

import "./styles/style.app.scss";

export default function App() {
    return (
        <div className="app-wrapper">
            <Main />
            <Cart />
        </div>
    );
}
