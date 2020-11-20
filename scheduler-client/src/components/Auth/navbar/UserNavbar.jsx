import React from 'react';
import { useDispatch } from "react-redux";
import { Navbar, Nav, Form, Button, Image } from "react-bootstrap"
import { logout } from "../../../features/authentication/authSlice";
import Logo from "../../../resources/ikona.png";


const UserNavbar = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/instructionPage"><Image src={Logo} width="70"
          height="70"
          style={{ zIndex: "3" }} /></Navbar.Brand>
        <Nav className="mr-auto" style={{ fontSize: "25px" }}>
          <Nav.Link href="#/addUserAcc">Utwórz konto mieszkańca</Nav.Link>
        </Nav>
        <Form inline>
          <Button variant="outline-info" onClick={handleLogout} href="/login">Wyloguj</Button>
        </Form>
      </Navbar>
    </>
  );
};
export default UserNavbar;