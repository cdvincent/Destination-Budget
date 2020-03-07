import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Input, Label, Small, FormBtn } from "../../components/Form/Form";
import API from "../../utils/API";
import "./style.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  login = event => {
    event.preventDefault();
    API.login({
      username: this.state.username.toLowerCase(),
      password: this.state.password
    })
      .then(res => {
        if (res.data.message) {
          this.setState({
            error: res.data.message
          });
        } else {
          console.log("login successful")
          this.props.isAuthorized();
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: "A server error has occured." });
      });

    this.setState({ password: "" });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.trim()
    });
  };

  render() {
    return (
      <div className="container">
        <div className="greeting">
        <h3 className="greetingText">Hello, guest.</h3>
        <h3 className="greetingText">Please sign in or register to access the site!</h3>
        </div>
        <form className="formBackground">
          <FormGroup>
            <Label text="Username:" />
            <div>
            <Input
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
              className="formInput"
            />
            </div>
          </FormGroup>
          <FormGroup>
            <Label text="Password:" />
            <div>
            <Input
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
              className="formInput"
            />
            </div>
          </FormGroup>
          {this.state.error ? <Small text={this.state.error} /> : ""}
          <FormBtn
            disabled={
              this.state.username && this.state.password ? "" : "disabled"
            }
            text="Login"
            onClick={this.login}
            classes="btn-primary"
          />
          <div>
          <Link to="/register">Not registered? Click here.</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
