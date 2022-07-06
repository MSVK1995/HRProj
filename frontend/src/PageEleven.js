import React, { Component } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

class PageEleven extends Component {
  state = {
    answer: []
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const questions = this.props.questions;
    const onChangeValue = (event) => {
      let ind = parseInt(event.target.name);
      let tempAns = { ...this.state.answer };
      tempAns[ind] = event.target.value;
      this.setState({ answer: tempAns });
      this.props.onChangeValue(event);
    };

    return (
      <div className="PageEleven" style={{ textAlign: "justify" }}>
        <table>
          <thead
            style={{
              backgroundColor: "seagreen",
              color: "white",
              paddingBottom: "20px"
            }}
          >
            <tr>
              <th>
                <center>
                  <h2>{questions.subName}</h2>
                </center>
              </th>
            </tr>
          </thead>

          <tbody>
            {questions.questions.map((s, index) => (
              <tr key={index}>
                <td>
                  <b>
                    <h4>{s.question}</h4>
                  </b>

                  <ButtonGroup
                    toggle
                    style={{
                      width: "100%",
                      justifyContent: "space-around",
                      paddingTop: 10,
                      paddingBottom: 50,
                      paddingLeft: 5,
                      paddingRight: 5
                    }}
                  >
                    <ToggleButton
                      type="radio"
                      id={String(index)}
                      variant="danger"
                      name={String(index)}
                      value="RED"
                      checked={s.answer === "2"}
                      onChange={onChangeValue}
                    >
                      RED
                    </ToggleButton>

                    <ToggleButton
                      type="radio"
                      id={String(index)}
                      variant="warning"
                      name={String(index)}
                      value="AMBER"
                      checked={s.answer === "2"}
                      onChange={onChangeValue}
                    >
                      AMBER
                    </ToggleButton>

                    <ToggleButton
                      type="radio"
                      id={String(index)}
                      variant="success"
                      name={String(index)}
                      value="GREEN"
                      checked={s.answer === "3"}
                      onChange={onChangeValue}
                    >
                      GREEN
                    </ToggleButton>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    );
  }
}

export default PageEleven;
