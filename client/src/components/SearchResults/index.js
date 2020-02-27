import React from "react";
import "./style.css";

function SearchResults(props) {
  return (
    <ul className="list-group search-results">
      {props.results.map(result => (
        <li key={result.QuoteId} className="list-group-item">
          <p>Departing From: {props.whereFrom}</p>
          <p>Departing On: {props.depDate}</p>
          <p>Arriving At: {props.whereTo}</p>
          <p>Returning On: {props.retDate}</p>
          <p>Price: ${result.MinPrice}</p>
          <p>Direct Flight: {result.Direct.toString()}</p>
          <button className="btn btn-primary">Select</button>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
