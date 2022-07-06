import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

class Cards extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  render() {
    return (
      <div className="Cards" style={{ textAlign: "justify" }}>
        <p>
          {" "}
          Please give each question a traffic light rating based on the scoring
          outlined below:{" "}
        </p>

        <CardGroup>
          <Card style={{ background: "green" }}>
            <Card.Body>
              <Card.Title style={{ color: "white" }}>“G” = GREEN</Card.Title>
              <Card.Text style={{ color: "white" }}>
                <br />
                My business has this in place / I am happy with our approach / I
                feel that I have sufficient knowledge
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ background: "orange" }}>
            <Card.Body>
              <Card.Title style={{ color: "white" }}>"A” = AMBER</Card.Title>
              <Card.Text style={{ color: "white" }}>
                <br />
                My business has something in place, but I feel it could be
                improved / I feel that I would need some support if this
                situation arose
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ background: "red" }}>
            <Card.Body>
              <Card.Title style={{ color: "white" }}>“R” = RED</Card.Title>
              <Card.Text style={{ color: "white" }}>
                <br />
                My business does not have provision for this / I feel unprepared
                for this situation
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <br />
      </div>
    );
  }
}

export default Cards;
