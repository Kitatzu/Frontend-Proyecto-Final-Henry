import { Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/"} component={Home} />
      </Switch>
    </>
  );
};
export default Routes;
