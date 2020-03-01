import React from "react";
import { Col, Row, Container } from "../components/Grid/Grid";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import Footer from "../components/Footer/Footer";

function Budget({logout}) {
  return (
    <div>
      <Jumbotron >BUDGET PAGE</Jumbotron>
      <Container >
        <button logout={logout}>log out</button>;
      </Container>
      <Footer />
    </div>
    );
}

export default Budget;
