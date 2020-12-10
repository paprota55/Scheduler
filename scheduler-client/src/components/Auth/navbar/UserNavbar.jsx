import React from "react";
import { useDispatch } from "react-redux";
import { Navbar, Nav, Form, Button, Image } from "react-bootstrap";
import { logout } from "../../../features/authentication/authSlice";
import Logo from "../../../resources/ikona.png";

const UserNavbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        style={{ width: "100%", margin: "0", padding: "0" }}
      >
        <Navbar.Brand href="/userPage">
          <Image src={Logo} width="70" height="70" />
        </Navbar.Brand>
        <Nav className="mr-auto" style={{ fontSize: "25px" }}>
          <Nav.Link href="#/instruction">Instrukcja</Nav.Link>
          <Nav.Link href="#/calendar">Harmonogram</Nav.Link>
          <Nav.Link href="#/calendarHistory">Historia</Nav.Link>
          <Nav.Link href="#/blocks">Zarządzaj blokami</Nav.Link>
          <Nav.Link href="#/settings">Ustawienia</Nav.Link>
        </Nav>
        <Form inline>
          <Button variant="outline-info" onClick={handleLogout} href="/login">
            Wyloguj
          </Button>
        </Form>
      </Navbar>
    </>
  );
};
export default UserNavbar;
