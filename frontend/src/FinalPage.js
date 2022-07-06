import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import StarRatings from 'react-star-ratings';

class FinalPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      rating: 0
    };
  }

  handleRating(e){
    this.setState({
      rating: e
    });
  }

  fetch_report(cust_id,cust_email)
  {

    axios.get("http://localhost:8000/api/survey/" + cust_id + "/", {
      responseType: 'blob',
      headers: {'Content-Type': 'application/json'},
      params: {'contact_email': cust_email}
    }).then(
      (response) => {
        console.log(response);
        // redirect to page where you can download report
        let blob = new Blob([response.data], {type: 'application/force-download'})
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = "Survey_response_report.pdf"
        link.click()
      },
      (error) => {
        console.log(error);
      }
    );
  }
  render() {
    const cust_email = this.props.contact_email;
    const cust_id = this.props.cust_id;

    return (
      <div className="FinalPage"
      style={{
        height:"100%"
      }}>
        <div 
        className="alert alert-success" 
        role="alert" 
        style={{
          marginTop:"100px",
          marginBottom:"50px"
        }}>
          <center><h2> Thank You! </h2>
          {/* <p> If you have finished, please submit your answers.</p> */}
          <Button variant="success" size="lg" onClick={()=>{this.fetch_report(cust_id,cust_email)}}>
            Download Report
          </Button></center>
        </div>
        <center>
          <h2> Please rate your experience!</h2>
        <StarRatings
          rating={this.state.rating}
          starHoverColor = 'yellow'
          starRatedColor='yellow'
          changeRating={(e) => {this.handleRating(e)}}
          numberOfStars={5}
          name='rating'
        />
        </center>
      </div>
    );
  }
}

export default FinalPage;
