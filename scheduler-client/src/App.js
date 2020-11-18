import logo from './logo.svg';
import './App.css';
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import CalendarPage from "./components/calendar/CalendarPage";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

function PrivateRoute({ component: Component, role, ...rest }) {
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
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <PrivateRoute path="/calendar" component={CalendarPage} />
      <Route exact path="*" component={LoginPage} />
    </Switch>
  </Router>

  );
}

export default App;
