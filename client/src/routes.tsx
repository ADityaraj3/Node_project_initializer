import { Route, Routes } from "react-router-dom";
import HomePage from "./modules/Home/HomePage/HomePage";
import Header from "./base/Header/Header";
import Footer from "./base/Footer/Footer";
import Vite from "./modules/Vite/Vite";
import Nest from "./modules/NestJs/Nest";
import Next from "./modules/NextJs/Next";
import Express from "./modules/Express/Express";
import Angular from "./modules/Angular/Angular";
import ContactUsPage from "./modules/Home/ContactUsPage/ContactUsPage";
import PrivacyPolicy from "./modules/Home/PrivacyPolicy/PrivacyPolicy";
import { ANGULAR, CONTACT, EXPRESS, HOME, NEST, NEXT, PRIVACY, VITE } from "./constants/RouteUrls";

function AppRoutes() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16">
                <Routes>
                    <Route path="*" element={<HomePage />} />
                    <Route path={HOME} element={<HomePage />} />
                    <Route path={VITE} element={<Vite />} />
                    <Route path={NEST} element={<Nest />} />
                    <Route path={NEXT} element={<Next />} />
                    <Route path={EXPRESS} element={<Express />} />
                    <Route path={ANGULAR} element={<Angular />} />
                    <Route path={CONTACT} element={<ContactUsPage />} />
                    <Route path={PRIVACY} element={<PrivacyPolicy />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default AppRoutes;
