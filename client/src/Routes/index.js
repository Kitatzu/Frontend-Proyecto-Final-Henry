import { Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home";
import LandingPage from "../components/LandingPage/LandingPage";
import CreateProduct from "../components/Profile/Dashboard/CreateProduct/CreateProduct";
import Register from "../components/Register/Register";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/"} component={LandingPage} />
        <Route exact path={"/register"} component={Register} />
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/dashboard/crud"} component={CreateProduct} />
      </Switch>
    </>
  );
};
export default Routes;
