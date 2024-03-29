import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Input, Label, Small, FormBtn } from "../../components/Form/Form";
import API from "../../utils/API";
import "./style.css";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirm: "",
    validUN: false,
    validEM: false,
    validPW: false,
    validCF: false,
    error: "",
    // eslint-disable-next-line
    reg: new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  };

  validateField = (name, value) => {
    switch (name) {
      case "username":
        if (value.length > 7) {
          API.availableUN(value.toLowerCase())
            .then(res => {
              res.data.length < 1
                ? this.setState({ validUN: true })
                : this.setState({ validUN: false });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.setState({ validUN: false });
        }
        break;
      case "email":
        this.setState({ validEM: this.state.reg.test(value) });
        break;
      case "password":
        this.setState({
          validPW: value.length > 7,
          validCF: value.length > 7 && value === this.state.confirm
        });
        break;
      case "confirm":
        this.setState({
          validCF: this.state.validPW && this.state.password === value
        });
        break;
      default:
    }
  };

  register = event => {
    event.preventDefault();
    let userInfo = {
      username: this.state.username.toLowerCase(),
      email: this.state.email,
      password: this.state.password
    };
    API.register(userInfo)
      .then(res => {
        if (res.data.message) {
          this.setState({
            error: res.data.message
          });
        } else {
          console.log("registration successful");
          this.login(userInfo);
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: "A server error has occured." });
      });

    this.setState({
      password: "",
      confirm: ""
    });
  };

  login = (userInfo) => {
    API.login(userInfo)
      .then(res => {
        if (res.status && res.status === 200 && !res.data.errors) {
          console.log("login successful")
          this.props.isAuthorized();
        } else {
          window.location.href = "/";
        }
      })
      .catch(err => {
        console.log(err);
        window.location.href = "/";
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.validateField(name, value);
  };

  render() {
    return (
      <div className="container registerContainer">
      <div className="greeting">
        <h3 className="greetingText">Hello, guest.</h3>
        <h3 className="greetingText">Register to access the site!</h3>
      </div>
        <form className="formBackground">
        <FormGroup>
          <Label text="Username:" />
          <div>
            <Input
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              placeholder="At least 8 characters"
              type="text"
              className="formInput"
            />
          </div>
          <div>
          {this.state.validUN ? <Small text="Username is available" /> : <Small text="Username is not available" />}
          </div>
          </FormGroup>
          <FormGroup>
          <Label text="Email:" />
          <div>
            <Input
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              placeholder="Email"
              type="email"
              className="formInput"
            />
          </div>
          <div>
            {this.state.validEM ? <Small text="Email is valid" /> : <Small text="Email is invalid" />}
          </div>
          </FormGroup>
          <FormGroup>
          <Label text="Password:" />
          <div>
            <Input
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="At least 8 characters"
              type="password"
              className="formInput"
            />
          </div>
          <div>
            {this.state.validPW ? <Small text="Password is valid" /> : <Small text="Password must be at least 8 characters" />}
          </div>
          </FormGroup>
          <FormGroup>
          <Label text="Confirm Password:" />
          <div>
            <Input
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleInputChange}
              type="password"
              className="formInput"
            />
          </div>
          <div>
            {this.state.validCF ? <Small text="Passwords match" /> : <Small text="Passwords don't match" />}
          </div>
          </FormGroup>
          {this.state.error ? <Small text={this.state.error} /> : ""}

          <FormGroup>
            <FormBtn
              disabled={
                this.state.validUN && this.state.validEM && this.state.validCF
                  ? ""
                  : "disabled"
              }
              text="Submit"
              onClick={this.register}
              classes="btn-primary"
            />
            <div>
            <Link to="/login">Already registered? Click here.</Link>
            </div>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default Register;
