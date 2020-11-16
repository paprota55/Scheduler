import logo from './logo.svg';
import './App.css';

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
        localStorage.getItem("currentUser") === role ? (
          <Component {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
  }
  
function App() {
  return (

    <div>
      {
        console.log("obecny")
      }
    </div>

  //   <Router basename="/">
  //   <Switch>
  //     <Route exact path="/login" component={LoginPage} />
  //     <Route exact path="/register" component={RegisterPage} />
  //     <PrivateRoute path="/userPage" role="EMPLOYEE" component={UserPage} />
  //     <Route exact path="*" component={LoginPage} />
  //   </Switch>
  // </Router>

  );
}

export default App;
