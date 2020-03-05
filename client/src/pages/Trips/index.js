import React, { Component } from "react";
import { FormBtn } from "../../components/Form/Form";
import API from "../../utils/API";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

class Trips extends Component {
    state = {
        username: "",
        trips: [],
        redirect: false,
        recommendedSavings: 0,
        calculated: false,
        message: ""
    };

    componentDidMount() {
        this.setState({ recommendedSavings: 0 })
        this.fetchTrips();
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    fetchTrips = () => {
        API.getTrips(this.props.username)
        .then(res => {
            this.setState({
                trips: res.data
            });
            console.log(res.data);
        });
    };

    recommendBudget = event => {
        this.setState({
            calculated: false,
            recommendedSavings: 0
        });
        let props=event.target.value.split(",");
        let today = new Date();
        let tripDate = new Date(props[0]);
        let daysUntilTrip = ((tripDate.getTime() - today.getTime()) / (1000 * 3600 * 24)) + 4/24
        console.log(tripDate);
        console.log(today);
        console.log(daysUntilTrip);
        if (daysUntilTrip <= 1) {
            this.setState ({
                recommendedSavings: parseFloat(props[1]),
                calculated: true
            })
        } else {
        let recommendedSavings = parseFloat(props[1]) / daysUntilTrip;
        this.setState({ 
            recommendedSavings: recommendedSavings,
            calculated: true
        });
        console.log(recommendedSavings);
    };
    };

    deleteTrip = event => {
        console.log(event.target.value);
        API.deleteTrip(event.target.value)
        .then(res => {
            console.log(res.data);
            this.fetchTrips();
        });
    };

    logout = () => {
        this.props.logout();
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
                        { this.state.calculated ? (<div>You must save an estimated average of ${this.state.recommendedSavings.toFixed(2)} per day to afford this trip.</div>
                       ) : ("")}
                    <h3>Trips: </h3>
                    <ul className="list-group search-results">
                    {this.state.trips.map(result =>(
                        <li key={result._id} className="list-group-item">
                            <p>Date of travel: {result.travelDate.toString().split("T")[0]}</p> 
                            <p>Traveling from: {result.whereFrom}</p>
                            <p>Traveling to: {result.whereTo}</p>
                            <p>Estimated cost: ${result.totalCost}</p>
                            <button onClick={this.recommendBudget} value={[result.travelDate, result.totalCost]}>Budget Trip</button>
                            <button onClick={this.deleteTrip} value={result._id}>Delete Trip</button>
                        </li>
                    ))}
                    </ul>
                    {this.state.trips.length > 0 ? ( <p></p> ) : (
                <h3>You have no trips yet!</h3> )}
                <Footer />
            </div>
        );
    };
};

export default Trips;