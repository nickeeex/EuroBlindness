import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import axios from 'axios';
import { API_URL } from './../constants';

class NavigationBar extends Component {

  register = () => {
    const headers = { 'Authorization': `Bearer ${this.props.auth.getAccessToken()}` }
    axios.post(`${API_URL}/register/`,{}, { headers })
  }

  constructor(props, context) {
    super(props, context);
    this.register();
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  logout = () => {
    this.props.auth.logout();
    this.props.history.replace(`/`);
  }

  render() {
    const { isAuthenticated, getRoomId } = this.props.auth;
    if (!isAuthenticated()) this.goTo('login');
    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">EuroBlindness</a>
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
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {getRoomId() && (
                [
                  <LinkContainer to="/vote">
                    <NavItem key="vote" href="/vote" >
                      Vote
                    </NavItem>
                  </LinkContainer>,
                  <LinkContainer to="/dashboard">
                    <NavItem key="dashboard" href="/dashboard" >
                      Dashboard
                    </NavItem>
                  </LinkContainer>
                ]
              )}
              {
                isAuthenticated() && (
                  <NavItem onClick={this.logout}>
                    Log Out
                  </NavItem>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
