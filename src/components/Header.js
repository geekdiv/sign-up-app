import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import SignUpModal from "./Sign-up-modal";

const header = () => {
  return (
    <Container>
      <Navbar expand="sm" variant="light" bg="light">
        <Navbar.Brand href="#">Sign up Demo</Navbar.Brand>
        <Nav.Item className="ml-auto">
          <SignUpModal></SignUpModal>
        </Nav.Item>
      </Navbar>
    </Container>
  );
};

export default header;
