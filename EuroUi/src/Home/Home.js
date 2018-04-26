import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { API_URL } from './../constants';
import axios from 'axios';

class Home extends Component {

  componentWillMount() {
    this.setState({ message: '' });
  }

  login = () => {
    this.props.auth.login();
  }

  renewToken = () => {
    this.props.auth.renewToken();
  }

  callPublicApi = () => {
    axios.get(`${API_URL}/public`)
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  callPrivateApi = () => {
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
    axios.get(`${API_URL}/private`, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  render() {
    const { isAuthenticated, getExpiryDate } = this.props.auth;
    const { message } = this.state;
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

        <h1>Make a Call to the Server</h1>
        {
          !isAuthenticated() &&
          <p>Log in to call a private (secured) server endpoint.</p>
        }
        <Button bsStyle="primary" onClick={this.callPublicApi}>Call public</Button>
        {' '}
        {
          isAuthenticated() && (
            <Button bsStyle="primary" onClick={this.callPrivateApi}>
              Call Private
              </Button>
          )
        }
        <h2>{message}</h2>
      </div>
    );
  }
}

export default Home;
