import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormGroup, FormBtn, Input, Label } from "../../components/Form/Form";
import DepartureResults from "../../components/DepartureResults";
import ArrivalResults from "../../components/ArrivalResults";
import API from "../../utils/API";
import Calendar from "react-calendar";
import CityResults from "../../components/CityResults/CityResults";
import  "./style.css"
const unirest = require("unirest");

class Search extends Component {
  state = {
    username: "",
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
    arrResultsPopulated: false,
    depResultsPopulated: false,
    depResultsMessage: "",
    arrResultsMessage: "",
    message: "",
    arrSelectIsValid: false,
    depSelectIsValid: false,
    currentTrip: {},
    totalCost: 0,
  };
  
  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({
      formattedWhereFrom: "",
      fromIsFormatted: false,
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
      arrResultsPopulated: false,
      depResultsPopulated: false,
      depResultsMessage: "",
      arrResultsMessage: "",
      message: "",
      currentTrip: {},
      totalCost: 0,
      arrSelectIsValid: false,
      depSelectIsValid: false
  
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
  };

  formatWhereTo = event => {
    this.setState({formattedWhereTo: event.target.value})
    this.setState({toIsFormatted: true}, () => this.searchReady());
    console.log(event.target.value);
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
        this.setState({depResultsPopulated: true,
            citySearched: false
        });
      } else {
        this.setState({
          depResultsPopulated: false,
          depResultsMessage: "No outbound flights found based on your search."
        });
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
    
    let queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + this.state.formattedWhereTo + "/" + this.state.formattedWhereFrom + "/" + this.state.retDate + "/";

    console.log(queryURL);

    API.skyScanner(queryURL)
    .then(res => {
      console.log(res.body.Quotes);
      this.setState({ arrResults: res.body.Quotes, error: "" });
      if (this.state.arrResults.length > 0) {
        this.setState({
          arrResultsPopulated: true,
          citySearched: false
        });
      } else {
        this.setState({
          arrResultsPopulated: false,
          arrResultsMessage: "No inbound flights found based on your search."
        });
      }

    })
    .catch(err => this.setState({ error: err.message }));
  };

  depSelect = event => {
    console.log(event.target.value);
    this.setState({ 
      totalCost: this.state.totalCost += parseInt(event.target.value),
      depSelectIsValid: true
    }, () => this.tripReady());
  };

  arrSelect = event => {
    console.log(event.target.value);
    this.setState({
      totalCost: this.state.totalCost += parseInt(event.target.value),
      arrSelectIsValid: true
    }, () => this.tripReady());
  };

  tripReady = () => {
    if (this.state.arrSelectIsValid && this.state.depSelectIsValid) {
      this.pushTrip();
    }
  }

  pushTrip = () => {
    console.log(this.state.whereFrom);
    let currentTrip = {
      totalCost: this.state.totalCost,
      whereFrom: this.state.whereFrom,
      whereTo: this.state.whereTo
    }
    this.setState({ 
      whereFrom: "",
      whereTo: ""
    });
    console.log(currentTrip);
    API.addTrip(this.state.username, currentTrip.totalCost, currentTrip.whereTo, currentTrip.whereFrom);
  }
  
//setting initial date for calendar
  componentDidMount() {
    this.setState({username: this.props.username});
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
        <h1>Hello, {this.props.username}</h1>
        <form>
        <FormGroup>
          <Label text="Destination:" />
          <Input
            name="whereTo"
            value={this.state.whereTo}
            onChange={this.handleInputChange}
            placeholder="Where are you flying to?"
            type="text"
          />
          </FormGroup>
          <FormGroup>
          <Label text="Departing from:" />
          <Input
            name="whereFrom"
            value={this.state.whereFrom}
            onChange={this.handleInputChange}
            placeholder="Where are you flying from?"
            type="text"
          />
          </FormGroup>
            <Calendar
              style= {{width: 400}}
              onChange={this.setDep}
              value={this.state.rawDepDate}
            />
            <Calendar
              style= {{width: 400}}
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

        {this.state.depResultsPopulated && this.state.flightSearched ? (<DepartureResults depResults={this.state.depResults} depDate={this.state.depDate} whereFrom={this.state.formattedWhereFrom} whereTo={this.state.formattedWhereTo} depSelect={this.depSelect} 
        />) : (<h4>{this.state.depResultsMessage}</h4>)}

        {this.state.arrResultsPopulated && this.state.flightSearched ? (<ArrivalResults arrResults={this.state.arrResults} retDate={this.state.retDate} whereFrom={this.state.formattedWhereFrom} whereTo={this.state.formattedWhereTo}  arrSelect={this.arrSelect}
        />) : (<h4>{this.state.arrResultsMessage}</h4>)}
      </div>
    );
  };
};

export default Search;