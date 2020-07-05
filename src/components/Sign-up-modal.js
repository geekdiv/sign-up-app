import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const SignUpModal = (props) => {
  const [show, setShow] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    errors: {
      name: "",
      email: "",
    },
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    //form clean-up if previously state
    setUser({
      name: "",
      email: "",
      errors: {
        name: "",
        email: "",
      },
    });
    setShow(true);
  };

  const validateForm = (formData) => {
    let errors = user.errors;
    Object.keys(formData).forEach((key) => {
      let value = formData[key];
      if (key.includes("name")) {
        errors.name =
          value.length < 3 ? "Name must be at least 3 characters long!" : "";
      } else if (key.includes("email")) {
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
      }
      setUser({ errors, [key]: value });
    });
  };

  const isValidForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsSubmit(true);
    let formData = {};
    formData[name] = value;
    validateForm(formData);
    setIsSubmit(isValidForm(user.errors));
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    validateForm(user);
    if (isValidForm(user.errors)) {
      console.log("form is valid");
      console.log("user ::" + JSON.stringify(user));
      handleClose();
      alert(`Hello ${user.name}, you are successfully registered with us.`);
    } else {
      console.log("invalid form");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sign-Up
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create new account</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitForm}>
          <Modal.Body>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Name"
                value={user.name}
              />
              {user.errors.name.length > 0 && (
                <Form.Text className="text-muted">
                  <span className="text-danger">{user.errors.name}</span>
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter email"
                defaultValue={user.email}
              />
              {user.errors.email.length > 0 && (
                <Form.Text className="text-muted">
                  <span className="text-danger">{user.errors.email}</span>
                </Form.Text>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={!isSubmit}>
              Sign Up
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default SignUpModal;
