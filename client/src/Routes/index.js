import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import LandingPage from "../components/LandingPage/LandingPage";
import CreateProduct from "../components/Profile/Dashboard/CreateProduct/CreateProduct";
//import Register from "../components/Register/Register";
import CardsDetails from "../components/CardsDetails/CardsDetails";
import Cart from "../components/Profile/Cart/Cart";
import Login from "../components/Login/Login";
import FormRegister from "../components/Login/FormRegister/FormRegister";
import Dashboard from "../components/Profile/Dashboard/Dashboard";
import AccountSettings from "../components/Profile/AccountSettings/AccountSettings";
import Inventory from "../components/Profile/Dashboard/Inventory/Inventory";
import Factura from "../components/Facturas/Factura/Factura";
import UsersTable from "../components/Profile/Dashboard/tableUsers/UsersTable";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import FacturaTable from "../components/Facturas/FacturaTable/FacturaTable";

const Routers = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path={"login"} element={<Login />} />
      <Route path={"login/register"} element={<FormRegister />} />
      <Route path={"home"} element={<Home />} />
      <Route path={"products/:id"} element={<CardsDetails />} />
      <Route path={"dashboard/crud"} element={<CreateProduct />} />
      <Route path={"dashboard/users"} element={<UsersTable />} />
      <Route path={"dashboard/facturas"} element={<FacturaTable />} />
      <Route path="dashboard/inventory" element={<Inventory />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="account" element={<AccountSettings />} />
      <Route path={"cart"} element={<Cart />} />
      <Route path={"/factura/:facturaId"} element={<Factura />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default Routers;
