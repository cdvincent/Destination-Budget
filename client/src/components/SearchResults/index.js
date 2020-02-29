import React from "react";
import "./style.css";

function SearchResults(props) {



  return (
    <div>
      <ul className="list-group search-results">
        {props.depResults.map(result => (
          <li key={result.QuoteId} className="list-group-item">
            <p>Departing From: {props.whereFrom}</p>
            <p>Departing On: {props.depDate}</p>
            <p>Arriving At: {props.whereTo}</p>
            <p>Returning On: {props.retDate}</p>
            <p>Price: ${result.MinPrice}</p>
            <p>Direct Flight: {result.Direct.toString()}</p>
          </li>
        ))}
      </ul>
      <ul className="list-group search-results">
      {props.arrResults.map(result => (
        <li key={result.QuoteId} className="list-group-item">
          <p>Departing From: {props.whereTo}</p>
          <p>Departing On: {props.depDate}</p>
          <p>Arriving At: {props.whereFrom}</p>
          <p>Returning On: {props.retDate}</p>
          <p>Price: ${result.MinPrice}</p>
          <p>Direct Flight: {result.Direct.toString()}</p>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default SearchResults;