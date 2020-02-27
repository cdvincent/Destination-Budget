import React from "react";
import { Col, Row, Container } from "../components/Grid/Grid";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import Footer from "../components/Footer/Footer";

function Budget({logout}) {
  return (
    <div>
      <Jumbotron >BUDGET PAGE</Jumbotron>
      <Container >
        <div className="cardBackground">
          <Row >
            <Col size="md-6">
            </Col>
            <Col size="md-6">
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
    );
}

export default Budget;
