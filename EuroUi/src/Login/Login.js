import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Login.css';

class Login extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="center">
        <img className="logo" src="../images/logo.png" alt="logo" />
        {
          !isAuthenticated() && (
            <Button
              id="qsLoginBtn"
              bsStyle="primary"
              className="btn-margin login-btn"
              onClick={this.login}
            >
              Sign in
              </Button>
          )
        }
      </div>
    );
  }
}

export default Login;