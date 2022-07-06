import React, { Component } from "react";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

import { categories } from "./categories";
import { user_info } from "./categories";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import PageFour from "./PageFour";
import PageFive from "./PageFive";
import PageSix from "./PageSix";
import PageSeven from "./PageSeven";
import PageEight from "./PageEight";
import PageNine from "./PageNine";
import PageTen from "./PageTen";
import PageEleven from "./PageEleven";
import PageTwelve from "./PageTwelve";
import PageThirteen from "./PageThirteen";

import UserForm from "./UserForm";
import Cards from "./Cards";
import Welcome from "./Welcome";
import FinalPage from "./FinalPage";
import { Button } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

import Sticky from "react-sticky-el";
import gc from './gc_light.jpg';
import logo from './Albatel_logo.png';
// import orange_light from './or_light.jpg';
// import bl_gr from './bl_gr.jpg';
// import g_pep from './gpep.jpg';



const data = categories;
const userInfo = user_info;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: data,
      formQuestions: userInfo,
      numPage: 0,
      surveyPage: 0,
      surveyBool: false,
      totalPage: 16,
      isFetched: false,
      isData: true,
      cust_id: null,
      surveyAnswers: [],
      userFormAnswers: [],
      radioValue:"",
      winHeight: '100vh'
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.surveyCheck = this.surveyCheck.bind(this);
    this.exportData = this.exportData.bind(this);
  }


  exportData(formOrSurvey) {
    if (formOrSurvey === "form") {
      const test = JSON.stringify({ cust_info: this.state.formQuestions });

      axios.post("http://localhost:8000/api/survey/",  
      test, {headers: {'Content-Type': 'application/json'}}).then(
        (response) => {
          console.log(response);
          // setState
          this.setState({ cust_id: response.data.cust_id }, () => {console.log(this.state)});
        },
        (error) => {
          console.log(error);
        }
      );
      console.log(JSON.stringify({ cust_info: this.state.formQuestions }));
    }

    if (formOrSurvey === "survey") {
      const test2 = JSON.stringify({
        contact_email: this.state.formQuestions.contact_email,
        survey_response: this.state.questions
      });
      console.log(this.state.cust_id)
      axios.put("http://localhost:8000/api/survey/" + this.state.cust_id + "/", 
      test2, {headers: {'Content-Type': 'application/json'}}).then(
        (response) => {
          console.log(response);
          // redirect to page where you can download report
        },
        (error) => {
          console.log(error);
        }
      );
      console.log(JSON.stringify({ survey_response: this.state.questions }));
    }
  }

  onChangeValue(event) {
    let temp = this.state.questions;
    let value = 0;
    if (event.target.value === "RED") {
      value = "1";
    } else if (event.target.value === "AMBER") {
      value = "2";
    } else if (event.target.value === "GREEN") {
      value = "3";
    }

    temp[this.state.surveyPage].questions[event.target.name].answer = value;
    this.setState({ questions: temp });

    // will need to adapt this code for pages with more than 4 questions
    // WOULD CAUSE AN ERROR IF NTO ADJUSTED
    //console.log(this.state.questions);
  }

  handleChange(event) {
    let temp = this.state.formQuestions;
    temp[event.target.name] = event.target.value;
    this.setState({ formQuestions: temp });
  }

  handleFormSubmit(event) {
    this.setState({ numPage: 2 });
    this.exportData("form");
    event.preventDefault();
  }

  surveyCheck(page, plusOrMinus) {
    let tempBool = this.state.surveyBool;
    if (page >= 3 && page <= 15) {
      this.setState({ surveyBool: true });
      if (plusOrMinus === "plus" && tempBool === true) {
        this.setState({ surveyPage: this.state.surveyPage + 1 });
      } else if (plusOrMinus === "minus" && tempBool === true) {
        this.setState({ surveyPage: this.state.surveyPage - 1 });
      }
      console.log("On a Survey Page");
    } else {
      this.setState({ surveyBool: false });
    }
  }
  setWinHeight(){
    this.setState({winHeight: document.documentElement.scrollHeight});
  }

  nextPage() {
    let navigatePage = true;
    //console.log(this.state.questions);
    if (this.state.numPage > 2) {
      // console.log(this.state.questions[this.state.numPage].questions[0].answer);
      this.state.questions[this.state.numPage - 3].questions.forEach(myFun);
      function myFun(value) {
        //console.clear();
        console.log(value.answer);
        if (value.answer === "") {
          navigatePage = false;
          // alert("Hello! I am an alert box!!");
        }
      }
    }
    if (navigatePage) {
      if (this.state.numPage < this.state.totalPage) {
        this.surveyCheck(this.state.numPage + 1, "plus");
        this.setState({ numPage: this.state.numPage + 1}, () =>{this.setWinHeight()});
      } else {
        console.log("You are on the final page");
        //this.setState({ numPage: 4 });
      }
    } else {
      alert("Please fill all the answers");
    }
  }

  prevPage() {
    if (this.state.numPage >= 1) {
      this.surveyCheck(this.state.numPage - 1, "minus");
      this.setState({ numPage: this.state.numPage - 1 }, () =>{this.setWinHeight()});
      //console.log("PageNum: " + this.state.numPage);
    } else {
      console.log("You cannot go back any further");
      //this.setState({ numPage: 0 });
    }

    //console.console.log(this.state.numPage);
  }

  lastPage(formOrSurvey)
  {
    this.exportData(formOrSurvey);
    this.nextPage();
  }
  render() {
    return (
      <div className="App" style = {{width: '100%', 
                                      height: this.state.winHeight,
                                      backgroundImage: `url(${gc})`,
                                      backgroundRepeat: 'no-repeat'}}>
      <div style={{height: 'inherit', backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
      {(this.state.numPage > 2 && this.state.numPage < 16) ? (
              <Sticky>
                <ProgressBar
                  variant="success"
                  striped 
                  animated
                  now={((this.state.numPage - 3) / 12) * 100}
                  label={`${Math.floor(((this.state.numPage - 3) / 12) * 100)} %`}
                />
              </Sticky>
            ) : null}
        <div className="container" >
        <div
            className="alert "
            role="alert"
            style={{
              backgroundColor: "rgba(72,161,77,0.6)",
              overflow: "hidden"
            }}
          >
          <br />
          {
            this.state.numPage === 0 ?
            <div>
              <center>
                <img src = {logo} alt = "Albatel"/>
              </center>
              <br />
            </div>
          :
            <h1>
              <center>ALBATEL </center>
            </h1>
          }
            <h3>
              <center>HR Health Check</center>
            </h3>
          {this.state.numPage === 0 && <Welcome />}
          {this.state.numPage === 1 && (
            <UserForm
              questions={this.state.formQuestions}
              handleChange={this.handleChange}
              handleFormSubmit={this.handleFormSubmit}
            />
          )}

          {this.state.numPage === 2 && <Cards />}

          {this.state.numPage === 3 && (
            <PageOne
              questions={this.state.questions[0]}
              onChangeValue={this.onChangeValue}
            />
          )}
          {this.state.numPage === 4 && (
            <PageTwo
              questions={this.state.questions[1]}
              onChangeValue={this.onChangeValue}
            />
          )}
          {this.state.numPage === 5 && (
            <PageThree
              questions={this.state.questions[2]}
              onChangeValue={this.onChangeValue}
            />
          )}
          {this.state.numPage === 6 && (
            <PageFour
              questions={this.state.questions[3]}
              onChangeValue={this.onChangeValue}
            />
          )}
          {this.state.numPage === 7 && (
            <PageFive
              questions={this.state.questions[4]}
              onChangeValue={this.onChangeValue}
            />
          )}
          {this.state.numPage === 8 && (
            <PageSix
              questions={this.state.questions[5]}
              onChangeValue={this.onChangeValue}
            />
          )}
          {this.state.numPage === 9 && (
            <PageSeven
              questions={this.state.questions[6]}
              onChangeValue={this.onChangeValue}
            />
          )}
          {this.state.numPage === 10 && (
            <PageEight
              questions={this.state.questions[7]}
              onChangeValue={this.onChangeValue}
            />
          )}
          {this.state.numPage === 11 && (
            <PageNine
              questions={this.state.questions[8]}
              onChangeValue={this.onChangeValue}
            />
          )}
          {this.state.numPage === 12 && (
            <PageTen
              questions={this.state.questions[9]}
              onChangeValue={this.onChangeValue}
            />
          )}
          {this.state.numPage === 13 && (
            <PageEleven
              questions={this.state.questions[10]}
              onChangeValue={this.onChangeValue}
            />
          )}
          {this.state.numPage === 14 && (
            <PageTwelve
              questions={this.state.questions[11]}
              onChangeValue={this.onChangeValue}
            />
          )}
          {this.state.numPage === 15 && (
            <PageThirteen
              questions={this.state.questions[12]}
              onChangeValue={this.onChangeValue}
            />
          )}
          {this.state.numPage === 16 && (
            <FinalPage 
              contact_email={this.state.formQuestions.contact_email}
              cust_id={this.state.cust_id}
             />
          )}

            {this.state.numPage === 15 && (
              <div className="mb-2">
                <Button variant="warning" size="lg" onClick={this.prevPage}>
                  PREV
                </Button>
                <Button
                  variant="success float-right"
                  size="lg"
                  onClick={() => this.lastPage("survey") }
                >
                  SUBMIT 
                </Button>
              </div>
            )}

          {this.state.numPage === 0 && (
            <div className="mb-2">
              <Button 
                variant="success float-right" 
                size="lg" 
                onClick={this.nextPage}>
                NEXT
              </Button>
            </div>
          )}

          {this.state.numPage > 1 && 
          this.state.numPage < this.state.totalPage-1 && (
            <div className="mb-2">
              <Button variant="warning float-left" size="lg" onClick={this.prevPage}>
                PREV
              </Button>
              <Button 
                variant="success float-right" 
                size="lg" 
                onClick={this.nextPage}>
                NEXT
              </Button>
            </div>
          )}
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
