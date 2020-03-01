import React from "react";

function DepartureResults(props) {
  
  return (
    <div>
      <h3>Outbound Flights:</h3>
      <ul className="list-group search-results">
        {props.depResults.map(result => (
          <li key={result.QuoteId} className="list-group-item">
            <p>Departing From: {props.whereFrom}</p>
            <p>Departing On: {props.depDate}</p>
            <p>Arriving At: {props.whereTo}</p>
            <p>Price: ${result.MinPrice}</p>
            <p>Direct Flight: {result.Direct.toString()}</p>
            <button onClick={props.depSelect} value={parseInt(result.MinPrice)} className="btn btn-primary">Select</button>
          </li>
        ))}
      </ul>
  </div>
  );
}

export default DepartureResults;