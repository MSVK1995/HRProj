import React, { Component } from "react";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <div className="alert" role="alert" style={{textAlign: "justify"}}>
          <p>
            This checklist will assist you with identifying whether your current
            HR practices comply with employment legislative requirements. Also,
            whether they fit with best practice to attract and retain the right
            people so you can achieve business success. This checklist is a
            mechanism to sense check the current state of play in your
            organisation and identify the areas of risk. <br />
            <br />
            Where areas of risk have been identified, we would recommend a more
            thorough and detailed questionnaire is completed and a comprehensive
            action plan report is finalised by one of our HR Expert Team for an
            affordable price. This cost can be offset against further engagement
            with our services.
          </p>
          <p style={{ color: "rgb(140,30,30)" }}>
            Request for information before/after completing to obtain report and
            for follow up::{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default Welcome;
