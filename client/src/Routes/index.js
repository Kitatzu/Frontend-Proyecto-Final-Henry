import { Route, Routes, useLocation } from "react-router-dom";

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
import Factura from "../components/Profile/Facturas/Factura/Factura";
import UsersTable from "../components/Profile/Dashboard/tableUsers/UsersTable";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import FacturaTable from "../components/Profile/Facturas/FacturaTable/FacturaTable";
import VerifCode from "../components/VerifCode/VerifCode";
import Calendar from "../components/Profile/Dashboard/components/calendar/calendar";

// import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./Transitions/styles.css";
import Series from "../components/Profile/Dashboard/Inventory/Series/Series";


const Routers = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={800}>
        <Routes location={location}>
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
          <Route path={"verification"} element={<VerifCode />} />
          <Route path={"/factura/:facturaId"} element={<Factura />} />
                    <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>

  );
};
export default Routers;
