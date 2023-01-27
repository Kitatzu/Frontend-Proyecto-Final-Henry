import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import LandingPage from "../components/LandingPage/LandingPage";
import CreateProduct from "../components/Profile/Dashboard/CreateProduct/CreateProduct";
//import Register from "../components/Register/Register";
import CardsDetails from "../components/CardsDetails/CardsDetails";
import Cart from "../components/Profile/Cart/Cart";
import Login from "../components/Login/Login";
import FormRegister from "../components/Login/FormRegister/FormRegister";

const Routers = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path={"login"} element={<Login />} />
      <Route path={"login/register"} element={<FormRegister />} />
      <Route path={"home"} element={<Home />} />
      <Route path={"products/:id"} element={<CardsDetails />} />
      <Route path={"dashboard/crud"} element={<CreateProduct />} />
      <Route path={"cart"} element={<Cart />} />
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};
export default Routers;
