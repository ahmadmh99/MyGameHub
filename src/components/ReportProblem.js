import React, { useState } from 'react';
import Navigation from './Navigation';
import { Button, Form, InputGroup, Container, Alert } from "react-bootstrap";
import { auth, db } from "../firebase/firebase";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const ReportProblem = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    category: '',
    screenshot: null,
  });

  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      screenshot: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setShowAlert(true); // Show alert after form submission
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #189, #118)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#fff',
        textAlign: 'center'
      }}
    >
      <Navigation/>
      <div className="inputclass">
        <Container>
          <h5 id="mytextjambo">Report a Problem</h5>
          <br></br>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <InputGroup.Prepend className="inputlabel">Name</InputGroup.Prepend>
              <Form.Control
                type="text"
                name="name"
                id="inputtext"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </InputGroup>
            <br></br>
            <InputGroup>
              <InputGroup.Prepend className="inputlabel">Email</InputGroup.Prepend>
              <Form.Control
                type="text"
                name="email"
                id="inputtext"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </InputGroup>
            <br></br>
            <InputGroup>
              <InputGroup.Prepend className="inputlabel">Description</InputGroup.Prepend>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                id="inputtext"
                placeholder="Write the Description of the problem"
                value={formData.description}
                onChange={handleChange}
              />
            </InputGroup>
            <br></br>
            <InputGroup>
              <InputGroup.Prepend className="inputlabel">Category</InputGroup.Prepend>
              <Form.Control
                type="text"
                name="category"
                id="inputtext"
                placeholder="Which Category you have the problem"
                value={formData.category}
                onChange={handleChange}
              />
            </InputGroup><br></br>
            <InputGroup>
              <InputGroup.Prepend className="inputlabel">Upload some Screenshots or videos so we can see your problem clearly</InputGroup.Prepend>
              <Form.Control
                type="file"
                name="screenshot"
                id="file"
                onChange={handleFileChange}
              />
            </InputGroup>
            <br/>
            <div className="text-center">
              <Button type="submit" id="mybutton">
                Save Changes
              </Button>
            </div>
            <br></br>
          </Form>
          {/* Alert component */}
          <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
            Successfully got the reported message
          </Alert>
        </Container>
      </div>
    </div>
  );
};

export default ReportProblem;
