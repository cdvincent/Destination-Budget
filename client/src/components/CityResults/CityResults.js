import React from "react";
import { FormGroup, FormBtn, Input, Label } from "../../components/Form/Form";

function CityResults(props) {

  return (
    <div>
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

export default CityResults;
