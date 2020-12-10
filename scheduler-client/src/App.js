import "./App.css";
import LoginPage from "./components/NoAuth/login/LoginPage";
import RegisterPage from "./components/NoAuth/register/RegisterPage";
import UserPage from "./components/Auth/UserPage";
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
    <div style={{width: "100%", margin: 0}}>
    <Router basename="/">
      <Switch>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute path="/userPage" component={UserPage} />
        <Route exact path="*" component={LoginPage} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
