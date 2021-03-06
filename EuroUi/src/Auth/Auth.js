import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { API_URL } from './../constants';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.apiUrl,
    responseType: 'token id_token',
    scope: 'openid profile user admin'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.scheduleRenewal();
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
        console.log(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    const headers = { 'Authorization': `Bearer ${authResult.accessToken}` }
    axios.post(`${API_URL}/register/`,{}, { headers }).then(() => {
      // Schedule renewal
      this.scheduleRenewal();
      // navigate to the home route
      history.replace('/');
    })
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getToken() {
    const token = localStorage.getItem('access_token');
    if(!token) {
      throw new Error("No token found");
    }
    
    var token_data = jwt_decode(token);
    //token_data.roomId = "1234";

    return token_data;
  }

  getRoomId() {
    const roomIdentifier = "https://euroblindness/roomId"
    const token = localStorage.getItem('access_token');

    var token_data = jwt_decode(token);
    
    return token_data[roomIdentifier];
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    clearTimeout(this.tokenRenewalTimeout);
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getExpiryDate() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return JSON.stringify(new Date(expiresAt));
  }

  renewToken() {
    this.auth0.checkSession({},
      (err, result) => {
        if (err) {
          console.log(
            `Could not get a new token (${err.error}: ${err.error_description}).`
          );
        } else {
          this.setSession(result);
          console.log(`Successfully renewed auth!`);
        }
      }
    );
  }

  scheduleRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  }
}
