import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import LandingPage from "../components/LandingPage/LandingPage";
import CreateProduct from "../components/Profile/Dashboard/CreateProduct/CreateProduct";
import Register from "../components/Register/Register";

const Routers = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path={"register"} element={<Register />} />
      <Route path={"home"} element={<Home />} />
      <Route path={"dashboard/crud"} element={<CreateProduct />} />
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};
export default Routers;
