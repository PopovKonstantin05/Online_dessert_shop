import { Routes, Route } from "react-router-dom";

import App from "../../App";
import DetailedItem from "../Item/DetailedItem";
import ScrollToTop from "../../helpers/ScrollToTop";

export default function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/item/:id" element={<DetailedItem />} />
            </Routes>
            <ScrollToTop /> {/* для скролла вверх при переходе на страницу по Link */}
        </div>
        
    );
}
