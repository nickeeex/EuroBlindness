import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import axios from 'axios';
import { API_URL } from './constants';

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
    return (
      <div>
        <Navbar collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">EuroBlindness</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer key="vote" to="/vote">
                    <NavItem key="vote" href="/vote" >
                      Vote
                    </NavItem>
              </LinkContainer>
              <LinkContainer key="dashboard" to="/dashboard">
                <NavItem key="dashboard" href="/dashboard" >
                  Dashboard
                </NavItem>
              </LinkContainer>
              <NavItem onClick={this.logout}>
                Log Out
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
