import React from "react";
import { Navbar, Container } from "react-bootstrap";
import Icon from "../assets/rubik.png";
import "../styles/navbar.css";

const NavigationBar = () => {
  const navbarStyle = {
    backgroundColor: "tomato",
  };

  return (
    <Navbar style={navbarStyle} variant="dark" className="shadow">
      <Container className="justify-content-center">
        <Navbar.Brand href="#home" className="title">
          <img
            alt=""
            src={Icon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Kyy
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
