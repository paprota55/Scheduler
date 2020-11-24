import "./App.css";
import LoginPage from "./components/NoAuth/login/LoginPage";
import RegisterPage from "./components/NoAuth/register/RegisterPage";
import InstructionPage from "./components/Auth/instruction/InstructionPage";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.getItem("token") === null ? (
          <Redirect to="/login" />
        ) : (
          <Component {...rest} />
        )
      }
    />
  );
}

function App() {
  return (
    <Router basename="/">
      <Switch>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute path="/instructionPage" component={InstructionPage} />
        <Route exact path="*" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
