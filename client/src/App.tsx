import { Route, Routes } from "react-router-dom";
import Paperbase from "./components/Paperbase";
import ClientPage from "./pages/ClientPage";
import EmployeesManagerPage from "./pages/EmployeesManagerPage/EmployeesManagerPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NewOrderPage from "./pages/NewOrderPage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import UserSettingsPage from "./pages/UserSettingsPage/UserSettingsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<ClientPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <Paperbase
              content={<NewOrderPage />}
              header={"Naujas užsakymas"}
            ></Paperbase>
          }
        />
        <Route
          path="/orders"
          element={
            <Paperbase
              content={<OrdersPage />}
              header={"Mano užsakymai"}
            ></Paperbase>
          }
        />
        <Route
          path="/usersettings"
          element={
            <Paperbase
              content={<UserSettingsPage />}
              header={"Vartotojo nustatymai"}
            ></Paperbase>
          }
        />
        <Route
          path="/employeesmanager"
          element={
            <Paperbase
              content={<EmployeesManagerPage />}
              header={"Darbuotojų valdymas"}
            ></Paperbase>
          }
        />
      </Routes>
    </>
  );
}

export default App;
