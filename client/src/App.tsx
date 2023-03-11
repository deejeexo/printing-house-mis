import { Route, Routes } from "react-router-dom";
import Paperbase from "./components/Paperbase";
import ClientPage from "./pages/ClientPage";
import ConsumableManagerPage from "./pages/ConsumableManagerPage/ConsumableManagerPage";
import EmployeesManagerPage from "./pages/EmployeesManagerPage/EmployeesManagerPage";
import EquipmentManagerPage from "./pages/EquipmentManagerPage/EquipmentManagerPage";
import News from "./pages/NewsPage/News";
import LoginPage from "./pages/LoginPage/LoginPage";
import NewOrderPage from "./pages/NewOrderPage/NewOrderPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import UserSettingsPage from "./pages/UserSettingsPage/UserSettingsPage";
import OrdersManagerPage from "./pages/OrdersManagerPage/OrdersManagerPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<ClientPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/neworder"
          element={
            <Paperbase
              content={<NewOrderPage />}
              header={"Naujas užsakymas"}
            ></Paperbase>
          }
        />
        <Route
          path="/news"
          element={
            <Paperbase content={<News />} header={"Naujienos"}></Paperbase>
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
        <Route
          path="/equipmentmanager"
          element={
            <Paperbase
              content={<EquipmentManagerPage />}
              header={"Įrangos valdymas"}
            ></Paperbase>
          }
        />
        <Route
          path="/consumablemanager"
          element={
            <Paperbase
              content={<ConsumableManagerPage />}
              header={"Eksploatacinių medžiagų valdymas"}
            ></Paperbase>
          }
        />
        <Route
          path="/ordersmanager"
          element={
            <Paperbase
              content={<OrdersManagerPage />}
              header={"Užsakymų valdymas"}
            ></Paperbase>
          }
        />
      </Routes>
    </>
  );
}

export default App;
