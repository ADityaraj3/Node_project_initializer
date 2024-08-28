import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
 
  return (
    <>
          <BrowserRouter>
            <ToastContainer autoClose={3000} />
            <AppRoutes />
          </BrowserRouter>

    </>


  );
}

export default App;
