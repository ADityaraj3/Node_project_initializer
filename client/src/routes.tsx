import { Route, Routes } from "react-router-dom";
import HomePage from "./modules/Home/HomePage/HomePage";
import Header from "./base/Header/Header";
import Footer from "./base/Footer/Footer";
import Vite from "./modules/Vite/Vite";
import Nest from "./modules/NestJs/Nest";
import Next from "./modules/NextJs/Next";
import Express from "./modules/Express/Express";
import Angular from "./modules/Angular/Angular";

function AppRoutes() {

    return (
        <>
            <Header />
            <Routes>
                <Route path="*" element={<HomePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/vite" element={<Vite />} />
                <Route path="/nest" element={<Nest />} />
                <Route path="/next" element={<Next />} />
                <Route path="/express" element={<Express />} />
                <Route path="/angular" element={<Angular />} />
            </Routes>
            <Footer />
        </>
    );
}

export default AppRoutes;
