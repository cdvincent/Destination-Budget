import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid/Grid";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import Footer from "../../components/Footer/Footer";
import { Input, Label, FormBtn, FormGroup, Small } from "../../components/Form/Form";
import API from "../../utils/API"
import Navbar from "../../components/Navbar/Navbar";

class Budget extends Component {
  state = {
    username: "",
    budgetExists: false,
    budget: [],
    rent: "",
    utilities: "",
    internet: "",
    carExpenses: "",
    groceries: "",
    cell: "",
    creditCards: "",
    otherExpenses: "",
    income: "",
    totalBudget: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
};

pushBudget = () => {

  let budget = {
    username: this.state.username,
    rent: parseInt(this.state.rent),
    utilities: parseInt(this.state.utilities),
    internet: parseInt(this.state.internet),
    carExpenses: parseInt(this.state.carExpenses),
    groceries: parseInt(this.state.groceries),
    cell: parseInt(this.state.cell),
    creditCards: parseInt(this.state.creditCards),
    otherExpenses: parseInt(this.state.otherExpenses),
    income: parseInt(this.state.income),
    totalBudget: parseInt(this.state.rent) +
    parseInt(this.state.utilities) +
    parseInt(this.state.internet) +
    parseInt(this.state.carExpenses) +
    parseInt(this.state.groceries) +
    parseInt(this.state.cell) +
    parseInt(this.state.creditCards) +
    parseInt(this.state.income)  + 
    parseInt(this.state.otherExpenses)
  }
  this.setState({
    totalBudget: budget.totalBudget,
    budgetExists: true
  });
  API.addBudget(budget).then( res => {
    if (res.data.username) {
      console.log(res);
      API.getBudget()
    } else {
      return false
    };
  });
};

componentDidMount = () => {
  this.setState({username: this.props.username});
  API.getBudget(this.props.username)
  .then(res => {
    console.log(res.data)
    if (res.data.length > 0) {
      this.setState({
          budget: res.data,
          budgetExists: true
      });
    } else {
      console.log("No budget found");
    }
  });
};

handleFormSubmit = event => {
  event.preventDefault();
  this.pushBudget();
  this.setState({
    rent: "",
    utilities: "",
    internet: "",
    carExpenses: "",
    groceries: "",
    cell: "",
    creditCards: "",
    otherExpenses: "",
    income: "",
    totalBudget: ""
  });
};

logout = () => {
  this.props.logout();
};

deleteBudget = event => {
  console.log(event.target.value);
  this.setState({budgetExists: false})
  API.deleteBudget(event.target.value)
  .then(res => {
      console.log(res.data);
      API.getBudget(this.props.username);
  });
};

render() {
  return (
    <div>
      <Navbar>
        <FormBtn
          text="Logout"
          onClick={this.logout}
          classes="btn-primary logoutBtn"
        />
        </Navbar>
        { this.state.budgetExists ? (<div>"Here is your budget"<button onClick={this.deleteBudget} value={this.state.username}>Delete Budget</button></div>) : (
      <form>
            <FormGroup>
            <Label text="Rent:" />
            <Input
                name="rent"
                value={this.state.rent}
                onChange={this.handleInputChange}
                type="number"
            />
            </FormGroup>
            <FormGroup>
            <Label text="Utilities:" />
            <Input
                name="utilities"
                value={this.state.utilities}
                onChange={this.handleInputChange}
                type="number"
            />
            </FormGroup>
            <FormGroup>
            <Label text="Internet:" />
            <Input
                name="internet"
                value={this.state.internet}
                onChange={this.handleInputChange}
                type="number"
            />
            </FormGroup>
            <FormGroup>
            <Label text="Groceries:" />
            <Input
                name="groceries"
                value={this.state.groceries}
                onChange={this.handleInputChange}
                type="number"
            />
            </FormGroup>
            <FormGroup>
            <Label text="Car expenses:" />
            <Input
                name="carExpenses"
                value={this.state.carExpenses}
                onChange={this.handleInputChange}
                placeholder="(Car payment, Gas, Insurance)"
                type="number"
            />
            </FormGroup>
            <FormGroup>
            <Label text="Cell phone:" />
            <Input
                name="cell"
                value={this.state.cell}
                onChange={this.handleInputChange}
                type="number"
            />
            </FormGroup>
            <FormGroup>
            <Label text="Credit card payments:" />
            <Input
                name="creditCards"
                value={this.state.creditCards}
                onChange={this.handleInputChange}
                type="number"
            />
            </FormGroup>
            <FormGroup>
            <Label text="Other expenses:" />
            <Input
                name="otherExpenses"
                value={this.state.otherExpenses}
                onChange={this.handleInputChange}
                type="number"
            />
            </FormGroup>
            <FormGroup>
            <Label text="Total Income:" />
            <Input
                name="income"
                value={this.state.income}
                onChange={this.handleInputChange}
                type="number"
            />
            </FormGroup>            
            <FormGroup>
                <FormBtn
                text="Submit"
                onClick={this.handleFormSubmit}
                classes="btn-primary"
                disabled={
                    this.state.rent !== "" && this.state.rent >= 0 && 
                    this.state.utilities !== "" && this.state.utilities >= 0 && 
                    this.state.internet !== "" && this.state.internet >= 0 &&
                    this.state.groceries !== "" && this.state.groceries >= 0 &&
                    this.state.carExpenses !== "" && this.state.carExpenses >= 0 &&
                    this.state.cell !== "" && this.state.cell >= 0 &&
                    this.state.creditCards !==  "" && this.state.creditCards >= 0 &&
                    this.state.income !==  "" && this.state.income >= 0 ? "" : "disabled"
                }
                />{
                  this.state.rent !== "" && this.state.rent >= 0 && 
                  this.state.utilities !== "" && this.state.utilities >= 0 && 
                  this.state.internet !== "" && this.state.internet >= 0 &&
                  this.state.groceries !== "" && this.state.groceries >= 0 &&
                  this.state.carExpenses !== "" && this.state.carExpenses >= 0 &&
                  this.state.cell !== "" && this.state.cell >= 0 &&
                  this.state.creditCards !==  "" && this.state.creditCards >= 0 &&
                  this.state.income !==  "" && this.state.income >= 0 ? <Small text="Form is valid. Click Submit" /> : <Small text="Please fill form out completely. No letters or negative numbers" />
                }
                </FormGroup>
            </form>
        )}
        <Footer />
    </div>
    );
  };
};

export default Budget;
