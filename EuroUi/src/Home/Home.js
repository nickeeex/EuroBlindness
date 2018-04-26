import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
class Home extends Component {
  login = () => {
    this.props.auth.login();
  }
  renewToken = () => {
    this.props.auth.renewToken();
  }
  render() {
    const { isAuthenticated, getExpiryDate } = this.props.auth;
    return (
      <div className="container">
        {isAuthenticated() &&
          <div>
            <h4>You are logged in!</h4>
            <h3>About Your Access Token</h3>
            <p>
              Your <code>access_token</code> has an expiry date of:{' '}
              {getExpiryDate()}
            </p>
            <p>
              The token has been scheduled for renewal, but you can also renew it manually
              if you don't want to wait. This manual renewal button is really
              just for demonstration and you probably won't want such a control
              in your actual application.
            </p>

            {isAuthenticated() &&
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.renewToken}
              >
                Renew Token
              </Button>}
          </div>}
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.login}
              >
                Log In
                </a>
              {' '}to continue.
              </h4>
          )
        }
      </div>
    );
  }
}

export default Home;
