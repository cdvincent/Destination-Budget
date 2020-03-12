import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Search from "./pages/Search";
import Trips from "./pages/Trips";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Budget from "./pages/Budget";
import Home from "./pages/Home";
import API from "./utils/API";
const dotenv = require('dotenv').config();



class App extends Component {

  state = {
    authorized: false,
    username: "",
    display: false
  };

  componentDidMount() {
    this.isAuthorized();
  };

  isAuthorized = () => {
    API.isAuthorized()
    .then(res => {
      if (res.data.message) {
        this.setState({ authorized: false, display: true });
      } else {
        this.setState({ 
        authorized: true,
        username: res.data.username,
        display: true
      });
      };
    })
  .catch(err => {
    console.log(err);
    this.setState({ authorized: false, display: true });
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
        {this.state.display ? (<div>
          <Switch>
            <Route exact path="/login">
              {this.state.authorized ? (
                <Redirect to="/trips" />
              ) : (
                <Login 
                isAuthorized={this.isAuthorized} />
              )}
            </Route>
            <Route exact path="/register">
              {this.state.authorized ? (
                <Redirect to="/budget" />
              ) : (
                <Register 
                isAuthorized={this.isAuthorized} />
              )}
            </Route>
            <Route exact path="/budget">
              {this.state.authorized ? (
                <Budget username={this.state.username} logout={this.logout} component={Budget} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/trips">
              {this.state.authorized ? (
                <Trips username={this.state.username} logout={this.logout} component={Trips}/>
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/search">
              {this.state.authorized ? (
                <Search username={this.state.username} logout={this.logout} component={Search} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/">
              {this.state.authorized ? (
                <Redirect to="/trips" />
              ) : (
                <Home component={Home} />
              )}
            </Route>
            <Route path="*">
            {this.state.authorized ? (
                <Redirect to="/trips" />
              ) : (
                <Home component={Home} />
              )}
              </Route>
            </Switch>
        </div>) : "" }
        
      </Router>
    );
};
};

export default App;