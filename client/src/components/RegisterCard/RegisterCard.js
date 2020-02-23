import React from "react";
import "../style.css";
import { FormBtn } from "../Form/Form";
import { Link } from "react-router-dom";
import Hline from "../Hline/Hline";

function RegisterCard() {
  return (
    <div>
        <div className="card registerCard">
            <img className="cardImg card-img-top" src="https://www.sterlingpubliclibrary.org/images/passports.JPG" alt="Card image cap"/>
            <div className="card-body">
              <h3 className="card-text">Register</h3>
              <Hline color="black" />
              <p>Sign up to get started!</p>
            </div>
            <Link
              to="/register">
              <FormBtn className="btn btn-primary cardBtn" text="Register" />
            </Link>
        </div>
    </div>
  );
}

export default RegisterCard;