import React, { Component } from "react";
import Footer from "../../components/Footer/Footer";
import { Input, Label, FormBtn, FormGroup, Small } from "../../components/Form/Form";
import API from "../../utils/API"
import Navbar from "../../components/Navbar/Navbar";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'; 
import "./style.css"

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
    dataId: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
};

pushBudget = (dispIncome, totalBudget) => {

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
    totalBudget: totalBudget,
    dispIncome: dispIncome
  };
  this.setState({
    budgetExists: true
  });
  this.addToast();
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
          budgetExists: true,
          budgetId: res.data._id
      });
    } else {
      this.setState({budgetExists: false});
      console.log("No budget found");
    }
  });
};

handleFormSubmit = event => {
  let totalBudget = parseInt(this.state.rent) +
  parseInt(this.state.utilities) +
  parseInt(this.state.internet) +
  parseInt(this.state.carExpenses) +
  parseInt(this.state.groceries) +
  parseInt(this.state.cell) +
  parseInt(this.state.creditCards) + 
  parseInt(this.state.otherExpenses);

  let income = parseInt(this.state.income);
  console.log(income)
  console.log(totalBudget);
  let dispIncome = income - totalBudget;
console.log(dispIncome, totalBudget);
  event.preventDefault();
  this.pushBudget(dispIncome, totalBudget);
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
    totalBudget: "",
    dispIncome: "",
    budgetId: ""
  });
};

logout = () => {
  this.props.logout();
};

deleteBudget = event => {
  this.deleteToast();
  console.log(event.target.value);
  this.setState({budgetExists: false})
  API.deleteBudget(event.target.value)
  .then(res => {
      console.log(res.data);
      API.getBudget(this.props.username);
  });
};

deleteToast = () => {
  toast("Budget successfully deleted");
}

addToast = () => {
  toast("Budget successfully added");
}

render() {
  return (
    <div>
      <Navbar logout={this.logout} username={this.state.username} />
      <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                    />
                <ToastContainer />
      <div className="container">
        { this.state.budgetExists ? (
          <div className="tableStyle">
          <h3 className="header">Here is your current budget, {this.state.username}:</h3>
          <table className="table">
            <thead>
              <tr>
              <th>Category</th>
              <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rent:</td>
                <td>${this.state.budget[0].rent}</td>
              </tr>
              <tr>
                <td>Utilities:</td>
                <td>${this.state.budget[0].utilities}</td>
              </tr>
              <tr>
                <td>Internet:</td>
                <td>${this.state.budget[0].internet}</td>
              </tr>
              <tr>
                <td>Car Expenses:</td>
                <td>${this.state.budget[0].carExpenses}</td>
              </tr>
              <tr>
                <td>Groceries:</td>
                <td>${this.state.budget[0].groceries}</td>
              </tr>
              <tr>
                <td>Cell Phone:</td>
                <td>${this.state.budget[0].cell}</td>
                </tr>
              <tr>
                <td>Credit Cards:</td>
                <td>${this.state.budget[0].creditCards}</td>
              </tr>
              <tr>
                <td>Other Expenses:</td>
                <td>${this.state.budget[0].otherExpenses}</td>
              </tr>
              <tr>
                <td>Income:</td>
                <td>${this.state.budget[0].income}</td>
              </tr>
              <tr>
                <td>Total Bills:</td>
                <td>${this.state.budget[0].totalBudget}</td>
              </tr>
              <tr>
                <td>Disposable Income:</td>
                <td>${this.state.budget[0].dispIncome}</td>
              </tr>
              </tbody>
              </table>
              <button className="btn btn-primary delete" onClick={this.deleteBudget} value={this.state.budgetId}>Delete Budget</button>
            </div>
            ) : (
      <form>
        <h3>Enter your monthly budget for each category:</h3>
            <FormGroup>
            <Label text="Rent:" />
            <div>
            <Input
                name="rent"
                value={this.state.rent}
                onChange={this.handleInputChange}
                type="number"
                className="formInput"
            />
            </ div>
            </FormGroup>
            <FormGroup>
            <Label text="Utilities:" />
            <div>
            <Input
                name="utilities"
                value={this.state.utilities}
                onChange={this.handleInputChange}
                type="number"
                className="formInput"
            />
            </div>
            </FormGroup>
            <FormGroup>
            <Label text="Internet:" />
            <div>
            <Input
                name="internet"
                value={this.state.internet}
                onChange={this.handleInputChange}
                type="number"
                className="formInput"
            />
            </div>
            </FormGroup>
            <FormGroup>
            <Label text="Groceries:" />
            <div>
            <Input
                name="groceries"
                value={this.state.groceries}
                onChange={this.handleInputChange}
                type="number"
                className="formInput"
            />
            </div>
            </FormGroup>
            <FormGroup>
            <Label text="Car expenses:" />
            <div>
            <Input
                name="carExpenses"
                value={this.state.carExpenses}
                onChange={this.handleInputChange}
                placeholder="(Car payment, Gas, Insurance)"
                type="number"
                className="formInput"
            />
            </div>
            </FormGroup>
            <FormGroup>
            <Label text="Cell phone:" />
            <div>
            <Input
                name="cell"
                value={this.state.cell}
                onChange={this.handleInputChange}
                type="number"
                className="formInput"
            />
            </div>
            </FormGroup>
            <FormGroup>
            <Label text="Credit card payments:" />
            <div>
            <Input
                name="creditCards"
                value={this.state.creditCards}
                onChange={this.handleInputChange}
                type="number"
                className="formInput"
            />
            </div>
            </FormGroup>
            <FormGroup>
            <Label text="Other expenses:" />
            <div>
            <Input
                name="otherExpenses"
                value={this.state.otherExpenses}
                onChange={this.handleInputChange}
                type="number"
                className="formInput"
            />
            </div>
            </FormGroup>
            <FormGroup>
            <Label text="Total Monthly Income:" />
            <div>
            <Input
                name="income"
                value={this.state.income}
                onChange={this.handleInputChange}
                type="number"
                className="formInput"
            />
            </div>
            </FormGroup>            
            <FormGroup>
              <div>
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
                />
                </div>
                {
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
        </div>
        <Footer />
    </div>
    );
  };
};

export default Budget;
