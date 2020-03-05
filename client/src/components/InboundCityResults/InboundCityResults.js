import React from "react";

function InboundCityResults(props) {

  return (
    <div>
      <h3>Select the airport you would like to travel to:</h3>
        <ul className="list-group search-results">
        {props.toResults.map(result => (
            <li key={result.PlaceId} className="list-group-item">
                <p>Airport Name: {result.PlaceName}</p>
                <p>Airport Code: {result.PlaceId.split("-")[0]}</p>
                <p>State: {result.RegionId !== "" ? (result.RegionId) : ("State not available")}</p>
                <button onClick={props.formatWhereTo} value={result.PlaceId} className="btn btn-primary">Select</button>
            </li>
            ))}
        </ul>
    </div>
  );
}

export default InboundCityResults;
