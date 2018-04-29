import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem } from 'react-bootstrap';
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  logout = () => {
    this.props.auth.logout();
    this.props.history.replace(`/`);
  }

  render() {
    const { isAuthenticated, getToken } = this.props.auth;
    if(!isAuthenticated()) this.goTo('login');
    return (
      <div>
        <Navbar collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">EuroBlindness</a>
              </Navbar.Brand>
              {
                !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login}
                  >
                    Log In
                    </Button>
                )
              }
              {
                isAuthenticated() && (
                  <Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout}
                  >
                    Log Out
                    </Button>
                )
              }
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Nav>
              {getToken().roomId && (
                [
                <NavItem key="vote" eventKey={1} href="/vote">
                  Vote
                </NavItem>,
                <NavItem key="users" eventKey={2} href="/users">
                  Users
                </NavItem>,
                <NavItem key="dashboard" eventKey={3} href="/dashboard">
                  Dashboard
                </NavItem>
                ]  
              )}
              
              <NavItem eventKey={4} href="#">
                Link
              </NavItem>
              <NavItem eventKey={5} href="#">
                Link
              </NavItem>
            </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
    );
  }
}

export default App;
