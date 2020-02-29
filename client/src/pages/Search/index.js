import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormGroup, FormBtn, Input, Label } from "../../components/Form/Form";
import SearchResults from "../../components/SearchResults";
import API from "../../utils/API";
import Calendar from "react-calendar";
import CityResults from "../../components/CityResults/CityResults";
const unirest = require("unirest");


class Search extends Component {
  state = {
    whereFrom: "",
    formattedWhereFrom: "",
    fromIsFormatted: false,
    whereTo: "",
    formattedWhereTo: "",
    toIsFormatted: false,
    rawDepDate: new Date(),
    rawRetDate: new Date(),
    initialDepDate: "",
    initialRetDate: "",
    depDate: "",
    retDate: "",
    retDateIsValid: true,
    depDateIsValid: true,
    cityToResults: [],
    cityFromResults: [],
    citySearched: false,
    flightSearched: false,
    depResults: [],
    arrResults: [],
    resultsPopulated: false,
    message: ""
  };
  
  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({
      whereFrom: "",
      formattedWhereFrom: "",
      fromIsFormatted: false,
      whereTo: "",
      formattedWhereTo: "",
      toIsFormatted: false,
      retDateIsValid: false,
      depDateIsValid: false,
      cityToResults: [],
      cityFromResults: [],
      citySearched: false,
      flightSearched: false,
      depResults: [],
      arrResults: [],
      resultsPopulated: false,
      message: ""
  });
    
    const hoistedResults = this;
    this.setState({citySearched: true});
   
    let from = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/")
    from.query({"query": this.state.whereFrom})
    from.headers({
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "5f49839056msh0904f5e8160aafap1c21f4jsn934d1f26815d"
    });
    from.then(function (res) {
      if (res.error) throw new Error(res.error);
      hoistedResults.setState({cityFromResults: res.body.Places})
      if (hoistedResults.state.cityFromResults === 0) {
        hoistedResults.setState({message: "No places matched your search. Please try a different search."});
      };
    });
    
    let to = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/")
    to.query({"query": this.state.whereTo})
    to.headers({
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "5f49839056msh0904f5e8160aafap1c21f4jsn934d1f26815d"
    });
    to.then(function (res) {
      if (res.error) throw new Error(res.error);
      hoistedResults.setState({cityToResults: res.body.Places});
      if (!hoistedResults.state.cityToResults) {
        hoistedResults.setState({message: "No places matched your search. Please try a different search."});
      };
    });
  };

  formatWhereFrom = event => {
    this.setState({formattedWhereFrom: event.target.value});
    this.setState({fromIsFormatted: true}, () => this.searchReady());
    console.log(event.target.value);
    console.log(this.state.fromIsFormatted);
  };

  formatWhereTo = event => {
    this.setState({formattedWhereTo: event.target.value})
    this.setState({toIsFormatted: true}, () => this.searchReady());
    console.log(event.target.value);
    console.log(this.state.toIsFormatted);
  };

  searchReady = () => {
    if (this.state.toIsFormatted && this.state.fromIsFormatted){
      this.flightSearch();
    };
  };

  flightSearch = () => {
    this.setState({
      citySearched: false, 
      flightSearched: true, 
      toIsFormatted: false, 
      fromIsFormatted: false
    });
    let userSearch = {
      formattedWhereFrom: this.state.formattedWhereFrom,
      formattedWhereTo: this.state.formattedWhereTo,
      depDate: this.state.depDate,
      error: ""
    };
    console.log(userSearch);
    
    let queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + this.state.formattedWhereFrom + "/" + this.state.formattedWhereTo + "/" + this.state.depDate + "/"

    console.log(queryURL);

    API.skyScanner(queryURL)
    .then(res => {
      console.log(res.body.Quotes);
      this.setState({ depResults: res.body.Quotes, error: "" });
      if (this.state.depResults.length > 0) {
        this.setState({resultsPopulated: true});
      } else {
        this.setState({resultsPopulated: false});
      }

    })
    .catch(err => this.setState({ error: err.message }));
    this.arrivalSearch();
  };

  arrivalSearch = () => {
    this.setState({
      citySearched: false, 
      flightSearched: true, 
      toIsFormatted: false, 
      fromIsFormatted: false
    });
    let userSearch = {
      formattedWhereFrom: this.state.formattedWhereFrom,
      formattedWhereTo: this.state.formattedWhereTo,
      retDate: this.state.retDate,
      error: ""
    };
    console.log(userSearch);
    
    let queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + this.state.formattedWhereTo + "/" + + this.state.formattedWhereFrom + "/" + this.state.retDate + "/";

    console.log(queryURL);

    API.skyScanner(queryURL)
    .then(res => {
      console.log(res.body.Quotes);
      this.setState({ arrResults: res.body.Quotes, error: "" });
      if (this.state.arrResults.length > 0) {
        this.setState({resultsPopulated: true});
      } else {
        this.setState({resultsPopulated: false});
      }

    })
    .catch(err => this.setState({ error: err.message }));
  };
  
//setting initial date for calendar
  componentDidMount() {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = "" + new Date().getFullYear();
    
    if (date.toString().length < 2) {
      date = "0" + date;
    };
    if (month.toString().length < 2) {
      month = "0" + month;
    };
    let startDate = year + "-" + month + "-" + date
      
      this.setState({
      depDate: startDate,
      retDate: startDate
    })
  };

//updating value based on user input
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  setDep = date => {
    this.setState({
      initialDepDate: date,
      message: ""
    });
    let parsedDate = date.toLocaleDateString().split("/");
    if (parsedDate[0].length < 2) {
      parsedDate[0] = "0" + parsedDate[0];
    };
    if (parsedDate[1].length < 2) {
      parsedDate[1] = "0" + parsedDate[1];
    };
    let newDate = parsedDate[2] + "-" + parsedDate[0] + "-" + parsedDate[1]
    
    this.setState({ depDate: newDate });
    let dateCheck = new Date();
    dateCheck.setDate(new Date().getDate()-1);
    if (date < dateCheck) {
      this.setState({
        message: "Time travel is way too expensive to budget. Please select a date in the future.",
        depDateIsValid: false
      });
    } else if (date > this.state.initialRetDate) {
      this.setState({
        message: "Please select a valid return date.",  depDateIsValid: false
      });
    } else {
      this.setState({
        message: "",
        depDateIsValid: true,
        retDateIsValid: true
      });
    };
  };
  
  setRet = date => {
    this.setState({
      initialRetDate: date,
      message: ""
    });
    let dateCheck = new Date();
    dateCheck.setDate(new Date().getDate()-1);
    let parsedDate = date.toLocaleDateString().split("/");
    if (parsedDate[0].length < 2) {
      parsedDate[0] = "0" + parsedDate[0];
    };
    if (parsedDate[1].length < 2) {
      parsedDate[1] = "0" + parsedDate[1];
    };
    let newDate = parsedDate[2] + "-" + parsedDate[0] + "-" + parsedDate[1];

    this.setState({ retDate: newDate });
    if (date < dateCheck) {
      this.setState({ 
        message: "Time travel is way too expensive to budget. Please select a date in the future.",        retDateIsValid: false
      });
    } else if (date < this.state.initialDepDate) {
      this.setState({
        message: "Please select a valid return date.",
        retDateIsValid: false
      })
    } else {
      this.setState({
        message: "",
        retDateIsValid: true,
        depDateIsValid: true
      });
    };
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
              disabled={
                this.state.whereFrom && this.state.whereTo && this.state.depDateIsValid && this.state.retDateIsValid ? "" : "disabled"
              }
            />
          </FormGroup>
        </form>

        {this.state.citySearched ? (<CityResults formatWhereFrom={this.formatWhereFrom} formatWhereTo={this.formatWhereTo} toResults={this.state.cityToResults} fromResults={this.state.cityFromResults} 
        />) : (<h2 className="resultsPlaceholder">{this.state.message}</h2>)}

        {this.state.resultsPopulated && this.state.flightSearched ? (<SearchResults depResults={this.state.depResults} arrResults={this.state.arrResults} depDate={this.state.depDate} retDate={this.state.retDate} whereFrom={this.state.formattedWhereFrom} whereTo={this.state.formattedWhereTo} 
        />) : (<h4>No results to display. Please make a new search.</h4>)}
      </div>
    );
  };
};

export default Search;