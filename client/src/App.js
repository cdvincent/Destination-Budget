import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Search from "./pages/Search";
import User from "./pages/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import API from "./utils/API";

class App extends Component {

  state = {
    //change back to false
    authorized: true
  };

  componentDidMount() {
    this.isAuthorized();
  };

  isAuthorized = () => {
    API.isAuthorized()
    .then(res => {
      if (res.data.message) {
        this.setState({ authorized: true });
      } else {
        this.setState({ authorized: true });
      };
    })
  .catch(err => {
    console.log(err);
    this.setState({ authorized: true });
  });
}
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              {this.state.authorized ? (
                <Home logout={this.logout} />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/login">
              {this.state.authorized ? (
                <Redirect to="/" />
              ) : (
                <Login 
                isAuthorized={this.isAuthorized} />
              )}
            </Route>
            <Route exact path="/register">
              {this.state.authorized ? (
                <Redirect to="/" />
              ) : (
                <Register 
                isAuthorized={this.isAuthorized} />
              )}
            </Route>
            {/* CHECK ROUTES */}
            <Route exact path="/user">
              {this.state.authorized ? (
                <User logout={this.logout} />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/search">
              {this.state.authorized ? (
                <Search logout={this.logout} />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  };
};

export default App;