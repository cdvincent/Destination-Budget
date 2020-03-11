import React, { Component } from "react";
import { FormBtn } from "../../components/Form/Form";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'; 
import API from "../../utils/API";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Hline from "../../components/Hline/Hline";
import "./style.css";

class Trips extends Component {
    state = {
        username: "",
        trips: [],
        redirect: false,
        recommendedSavings: 0,
        dailyDispIncome: 0,
        calculated: false,
        message: "",
        budget: [],
        budgetExists: false,
        tripPassed: false,
        isAffordable: false,
    };

    componentDidMount() {
        this.setState({
            recommendedSavings: 0,
            username: this.props.username
        });
        this.fetchTrips();
        this.fetchBudget();
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    deleteToast = () => {
        toast("Trip successfully deleted");
    }

    fetchBudget = () => {
        API.getBudget(this.props.username)
        .then(res => {
            console.log(res.data)
            if (res.data) {
            this.setState({
                budget: res.data,
                budgetExists: true
            });
            console.log(this.state.budget);
            } else {
            console.log("No budget found");
            }
        });
    }

    fetchTrips = () => {
        API.getTrips(this.props.username)
        .then(res => {
            this.setState({
                trips: res.data
            });
            console.log(res.data);
        });
    };

    recommendReady = event => {
        this.setState({
            calculated: false,
            tripPassed: false,
            message: "",
            recommendedSavings: 0,
            isAffordable: false
        })
        this.recommendBudget(event)
    }

    recommendBudget = event => {
        let props=event.target.value.split(",");
        let today = new Date();
        let tripDate = new Date(props[0]);
        let daysUntilTrip = ((tripDate.getTime() - today.getTime()) / (1000 * 3600 * 24)) + 4/24
        if (daysUntilTrip <= 1 && daysUntilTrip > 0) {
            this.setState ({
                recommendedSavings: parseFloat(props[1]),
                calculated: true
            });
        } else if (daysUntilTrip > 1) {
        let recommendedSavings = parseFloat(props[1]) / daysUntilTrip;
        this.setState({ 
            recommendedSavings: recommendedSavings,
            calculated: true
        });
        } else {
            this.setState({
                calculated: true,
                tripPassed: true,
                message: "This trip has passed. Search for another!"
            });
        };
        let dispIncome = this.state.budget[0].dispIncome
        let dailyDispIncome = dispIncome / 30;
        if (dailyDispIncome >= this.state.recommendedSavings) {
            this.setState({ 
                isAffordable: true,
                dailyDispIncome: dailyDispIncome
             })
        } else {
            this.setState({
                isAffordable: false,
                dailyDispIncome: dailyDispIncome
            })
        };
    };

    deleteTrip = event => {
        console.log(event.target.value);
        API.deleteTrip(event.target.value)
        .then(res => {
            console.log(res.data);
            this.deleteToast();
            this.fetchTrips();
        });
    };

    logout = () => {
        this.props.logout();
      };

    render() {
        return (
            <div>
                <Navbar logout={this.logout} username={this.state.username}>
                <FormBtn
                    text="Logout"
                    onClick={this.logout}
                    classes="btn-primary logoutBtn"
                />
                </Navbar>
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
                    <h3>Here are you trips, {this.state.username}: </h3>
                    <Hline />
                        { this.state.calculated && !this.state.tripPassed ? (<div>You must save an estimated average of ${this.state.recommendedSavings.toFixed(2)} per day to afford this trip.</div>
                       ) : ("")}
                       { this.state.calculated && this.state.tripPassed ? (<div>{this.state.message}</div>) : ("")}
                       { this.state.isAffordable && !this.state.tripPassed ? (<div>You are able to save an average of ${this.state.dailyDispIncome.toFixed(2)} per day.</div>) : ("")}
                       { !this.state.isAffordable && this.state.calculated ? (<div>You are able to save an average of ${this.state.dailyDispIncome.toFixed(2)} per day.</div>) : ("")}
                    <ul className="list-group search-results allTrips">
                    {this.state.trips.map(result =>(
                        <li key={result._id} className="list-group-item tripDiv">
                            <p>Date of travel: <p>{result.travelDate.toString().split("T")[0]}</p>
                            </p> 
                            <Hline />
                            <p>Traveling from: <p>{result.whereFrom}</p></p>
                            <Hline />
                            <p>Traveling to: <p>{result.whereTo}</p></p>
                            <Hline />
                            <p>Estimated cost: <p>${result.totalCost}</p></p>
                            <Hline />
                            <button className="btn btn-primary tripBtn" onClick={this.recommendReady} value={[result.travelDate, result.totalCost]}>Budget Trip</button>
                            <button className="btn btn-secondary" onClick={this.deleteTrip} value={result._id}>Delete Trip</button>
                        </li>
                    ))}
                    </ul>
                    {this.state.trips.length > 0 ? ( <p></p> ) : (
                <h3>You have no trips yet!</h3> )}
                </div>
                <Footer />
            </div>
        );
    };
};

export default Trips;