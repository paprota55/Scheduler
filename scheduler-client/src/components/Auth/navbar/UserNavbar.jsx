import React from "react";
import { useDispatch } from "react-redux";
import { Navbar, Nav, Form, Button, Image } from "react-bootstrap";
import { logout } from "../../../features/authentication/authSlice";
import Logo from "../../../resources/ikona.png";
import { navbarComponentMessages } from "../../../languages/plLanguage"

const UserNavbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };
  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        style={{ width: "100%", margin: "0", padding: "0", height: "8vh" }}
      >
        <Navbar.Brand href="/userPage">
          <Image src={Logo} width="50" height="100%" />
        </Navbar.Brand>
        <Nav className="mr-auto" style={{ fontSize: "25px" }}>
          <Nav.Link href="#/instruction">{navbarComponentMessages.instructionLabel}</Nav.Link>
          <Nav.Link href="#/calendar">{navbarComponentMessages.calendarLabel}</Nav.Link>
          <Nav.Link href="#/calendarHistory">{navbarComponentMessages.calendarHistoryLabel}</Nav.Link>
          <Nav.Link href="#/blocks">{navbarComponentMessages.blockEditLabel}</Nav.Link>
          <Nav.Link href="#/settings">{navbarComponentMessages.settingsLabel}</Nav.Link>
        </Nav>
        <Form inline>
          <Button variant="outline-info" onClick={handleLogout} href="/login">
            {navbarComponentMessages.logoutButtonLabel}
          </Button>
        </Form>
      </Navbar>
    </>
  );
};
export default UserNavbar;
