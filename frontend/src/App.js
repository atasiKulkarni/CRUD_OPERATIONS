// import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Home } from "./Component/Home";

export function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home}></Route>
      </Switch>
    </div>
  );
}
