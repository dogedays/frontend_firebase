import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



function BasicExample() {
    return (
      <Navbar bg="dark" expand="lg" variant='dark'>
        <Container>
          <Navbar.Brand href="#home">Prop Bot</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/showAll">Leagues</Nav.Link>
              <NavDropdown title="Manage" id="basic-nav-dropdown">
                <NavDropdown.Item href="/showAccounts">Accounts</NavDropdown.Item>
                <NavDropdown.Item href="/figures">
                  Figures
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/reports">
                  Reports
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default BasicExample;