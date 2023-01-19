import { Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home";
import Register from "../components/Register/Register";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/register"} component={Register} />
      </Switch>
    </>
  );
};
export default Routes;
