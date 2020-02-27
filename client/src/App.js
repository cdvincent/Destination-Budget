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
    authorized: false
  };

  componentDidMount() {
    this.isAuthorized();
  };

  isAuthorized = () => {
    API.isAuthorized()
    .then(res => {
      if (res.data.message) {
        this.setState({ authorized: false });
      } else {
        this.setState({ authorized: true });
      };
    })
  .catch(err => {
    console.log(err);
    this.setState({ authorized: false });
  });
};

  logout = () => {
    API.logout()
      .then(res => {
        console.log("logged out");
        this.isAuthorized();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              {this.state.authorized ? (
                <Redirect to="/user" />
              ) : (
                <Home />
              )}
            </Route>
            <Route exact path="/login">
              {this.state.authorized ? (
                <Redirect to="/search" />
              ) : (
                <Login 
                isAuthorized={this.isAuthorized} />
              )}
            </Route>
            <Route exact path="/register">
              {this.state.authorized ? (
                <Redirect to="/search" />
              ) : (
                <Register 
                isAuthorized={this.isAuthorized} />
              )}
            </Route>
            <Route exact path="/user">
              {this.state.authorized ? (
                <User logout={this.logout} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/search" component={Search}>
              {this.state.authorized ? (
                <Search logout={this.logout} />
              ) : (
                <Route exact path="/search" component={Search}/>
              )}
            </Route>
            <Route exact path="/budget">
              {this.state.authorized ? (
                <User logout={this.logout} />
              ) : (
                <Redirect to="/" />
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