import React from "react";
import "../style.css";
import { FormBtn } from "../Form/Form";
import { Link } from "react-router-dom";
import Hline from "../Hline/Hline";

function LoginCard() {
  return (
    <div>
        <div className="card loginCard">
            <img className="cardImg card-img-top" src="https://www.vacationsbymarriott.com/dbimage.ashx?cropname=cap-cana-coast-dominican-republic-2121x1414-1" alt="Card image cap"/>
            <div className="card-body">
              <h3 className="card-text">Log In</h3>
              <Hline color="black" />
              <p>See your existing trips or find a new one!</p>
            </div>
            <Link
              to="/login">
              <FormBtn className="btn btn-primary cardBtn" text="Log In" />
            </Link>
      </div>
    </div>
  );
}

export default LoginCard;