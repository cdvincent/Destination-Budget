import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormGroup, FormBtn, Input, Label } from "../../components/Form/Form";
import SearchResults from "../../components/SearchResults";
import API from "../../utils/API";
import Calendar from "react-calendar";
const unirest = require("unirest");


class Search extends Component {
  state = {
    whereFrom: "",
    whereTo: "",
    rawDepDate: new Date(),
    rawRetDate: new Date(),
    depDate: "",
    retDate: "",
    results: [],
    searched: false
  };
  
  //validation

  handleFormSubmit = event => {
    event.preventDefault();

    let userSearch = {
      whereFrom: this.state.whereFrom.toUpperCase().split(" ").join("") + "-sky",
      whereTo: this.state.whereTo.toUpperCase().split(" ").join("") + "-sky",
      depDate: this.state.depDate,
      retDate: this.state.retDate,
      error: ""
    };

    let queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + userSearch.whereFrom + "/" + userSearch.whereTo + "/" + userSearch.depDate + "?inboundpartialdate=" + userSearch.retDate;

    console.log(queryURL);

    API.flightSearch(queryURL)
    .then(res => {
      console.log(res.body.Quotes);
      this.setState({ searched: true });
      this.setState({ results: res.body.Quotes, error: "" });

    })
    .catch(err => this.setState({ error: err.message }));
  };

  componentDidMount() {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = "" + new Date().getFullYear();
    let startDate = year + "-" + month + "-" + date

      if (date.toString().length < 2) {
        date = "0" + date;
      };
      if (month.toString().length < 2) {
        month = "0" + month;
      };
      
      this.setState({
      depDate: startDate,
      retDate: startDate
    })
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  setRet = date => {
    let parsedDate = date.toLocaleDateString().split("/");
    if (parsedDate[0].length < 2) {
      parsedDate[0] = "0" + parsedDate[0];
    };
    if (parsedDate[1].length < 2) {
      parsedDate[1] = "0" + parsedDate[1];
    };
    let newDate = parsedDate[2] + "-" + parsedDate[0] + "-" + parsedDate[1];

    this.setState({ retDate: newDate });
  };

  setDep = date => {
    let parsedDate = date.toLocaleDateString().split("/");
    if (parsedDate[0].length < 2) {
      parsedDate[0] = "0" + parsedDate[0];
    };
    if (parsedDate[1].length < 2) {
      parsedDate[1] = "0" + parsedDate[1];
    };
    let newDate = parsedDate[2] + "-" + parsedDate[0] + "-" + parsedDate[1]
    
    this.setState({ depDate: newDate });
  };

  render() {
    return (
      <div className="container registerContainer">
        <form>
        <FormGroup>
          <Label text="Destination" />
          <Input
            name="whereTo"
            value={this.state.whereTo}
            onChange={this.handleInputChange}
            placeholder="Where are you flying to?"
            type="text"
          />
          </FormGroup>
          <FormGroup>
          <Label text="Departure" />
          <Input
            name="whereFrom"
            value={this.state.whereFrom}
            onChange={this.handleInputChange}
            placeholder="Where are you flying from?"
            type="text"
          />
          </FormGroup>
            <Calendar
              onChange={this.setDep}
              value={this.state.rawDepDate}
            />
            <Calendar
              onChange={this.setRet}
              value={this.state.rawRetDate}
            />
          <FormGroup>
            <FormBtn
              text="Submit"
              onClick={this.handleFormSubmit}
              classes="btn-primary"
            />
          </FormGroup>
        </form>
        { this.state.searched ? (<SearchResults results={this.state.results} depDate={this.state.depDate} retDate={this.state.retDate} whereFrom={this.state.whereFrom} whereTo={this.state.whereTo} 
        />) : ("no results")}
      </div>
    );
  };
};

export default Search;