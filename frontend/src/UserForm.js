import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";

const UserForm = (props) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null
      });
  };

  const handleChange = (event_or_val, country, phEvent) => {
    // const [form, setForm] = useState({});
    //console.log(phEvent.target);
    if (phEvent !== undefined) {
      props.handleChange(phEvent);
      setField(phEvent.target.name, phEvent.target.value);
    } else {
      props.handleChange(event_or_val);
      setField(event_or_val.target.name, event_or_val.target.value);
    }
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      props.handleFormSubmit(event);
    }

    setValidated(true);
  };


  return (
    <div className="UserForm">
     <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Company name</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              name="company_name"
              type="text"
              placeholder="Company name"
              // style={{
              //   background: "transparent"
              // }}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
          </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="validationCustom02">
            <Form.Label>Business Sector</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              name="business_sector"
              type="text"
              placeholder="Business Sector"
              // style={{
              //   background: "transparent"
              // }}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
          </Form.Row>
        <Form.Row>
          <Form.Group as={Col}  controlId="validationCustom03">
            <Form.Label>Number of Employees</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              name="employee_count"
              type="number"
              min="1"
              placeholder="Number of Employees"
              // style={{
              //   background: "transparent"
              // }}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
          </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="validationCustom05">
            <Form.Label>Location</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="company_location"
              placeholder="Location"
              // style={{
              //   background: "transparent"
              // }}
              required
            />
            {/* <Form.Control.Feedback type="invalid">
              Please provide a valid Location.
            </Form.Control.Feedback> */}
          </Form.Group>
          </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="validationCustom06">
            <Form.Label>Contact Name</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              name="contact_name"
              placeholder="Contact Name"
              // style={{
              //   background: "transparent"
              // }}
              required
            />
            {/* <Form.Control.Feedback type="invalid">
              Please provide a valid name.
            </Form.Control.Feedback> */}
          </Form.Group>
          </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="validationCustom07">
            <Form.Label>Contact Job Title</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              name="contact_job_title"
              placeholder="Contact Job Title"
              // style={{
              //   background: "transparent"
              // }}
              required
            />
            {/* <Form.Control.Feedback type="invalid">
              Please provide a valid Job Title.
            </Form.Control.Feedback> */}
          </Form.Group>
          </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="validationCustom08">
            <Form.Label>Contact email</Form.Label>
            <Form.Control
              type="email"
              onChange={handleChange}
              name="contact_email"
              placeholder="Contact Email"
              // style={{
              //   background: "transparent"
              // }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>
          </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="validationCustom09">
            {/* <Form.Label>Contact Telephone</Form.Label> */}
            <PhoneInput
              inputProps={{
                name: "contact_telephone",
                required: true
              }}
              inputStyle={{
                marginTop: "10px",
                // background: "transparent"
              }}
              disableCountryCode="false"
              autoFormat="false"
              placeholder="Enter phone number"
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid phone.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Button 
        type="submit"
        variant="success float-right"
        >Next</Button>
      </Form>
    </div>
  );
};

export default UserForm;
