import React from "react";

function OutboundCityResults(props) {

  return (
    <div>
      <h3>Select the airport you would like to travel from:</h3>
        <ul className="list-group search-results">
          {props.fromResults.map(result => (
            <li key={result.PlaceId} className="list-group-item">
            <p>Airport Name: {result.PlaceName}</p>
            <p>Airport Code: {result.PlaceId.split("-")[0]}</p>
            <p>State: {result.RegionId !== "" ? (result.RegionId) : ("State not available")}</p>
            <button onClick={props.formatWhereFrom} value={result.PlaceId} className="btn btn-primary">Select</button>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default OutboundCityResults;
