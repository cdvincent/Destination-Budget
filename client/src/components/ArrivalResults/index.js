import React from "react";

function ArrivalResults(props) {

    return (
        <div>
            <h3>Inbound Flights:</h3>
            <ul className="list-group search-results">
                {props.arrResults.map(result => (
                <li key={result.QuoteId} className="list-group-item">
                <p>Departing On: {props.retDate}</p>
                <p>Departing From: {props.whereTo.split("-")[0]}</p>
                <p>Arriving At: {props.whereFrom.split("-")[0]}</p>
                <p>Price: ${result.MinPrice}</p>
                <p>Direct Flight: {result.Direct.toString()}</p>
                <button onClick={props.arrSelect} value={parseInt(result.MinPrice)} className="btn btn-primary">Select</button>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default ArrivalResults;