import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{ 
          backgroundColor: '#262626',
          borderLeft: '4px solid #6366f1'
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
