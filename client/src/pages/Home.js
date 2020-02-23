import React from "react";
import { Col, Row, Container } from "../components/Grid/Grid";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import LoginCard from "../components/LoginCard/LoginCard";
import RegisterCard from "../components/RegisterCard/RegisterCard";
import Footer from "../components/Footer/Footer";

function Home({logout}) {
  return (
    <div>
      <Jumbotron />
      <Container >
        <div className="cardBackground">
          <Row >
            <Col size="md-6">
              <LoginCard />
            </Col>
            <Col size="md-6">
              <RegisterCard />
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
    );
}

export default Home;
