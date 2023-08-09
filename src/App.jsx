import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProviders } from "./context";

const App = () => {
  return (
    <AppProviders>
      <MainLayout></MainLayout>
      <ToastContainer></ToastContainer>
    </AppProviders>
  );
};

export default App;
