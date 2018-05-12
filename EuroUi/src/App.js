import React, { Component } from 'react';
import { Route, Router, Redirect, withRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Login from './Login/Login';
import RoomChoise from './Login/RoomChoise';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import Vote from './Vote/Vote';
import Users from './Users/Users';
import Dashboard from './Dashboard/Dashboard';
import history from './history';
import axios from 'axios';
import { API_URL } from './constants';

const auth = new Auth();

const unlisten = history.listen((location, action) => {
  console.log(action, location.pathname, location.state);
});

class App extends Component {

  handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    }
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) =>
            !auth.isAuthenticated() ?
              <Login auth={auth} {...props} /> :
              <NavigationBar auth={auth} {...props} />
          }
          />

          <Route exact path="/" render={(props) =>
            !auth.isAuthenticated() ?
              null :
              <Vote auth={auth} {...props} />
          }
          />
          <Route key="callback" path="/callback" render={(props) => {
            this.handleAuthentication(props);
            return <Callback {...props} />
          }} />

          <Route key="vote" path="/vote" render={(props) => {
            return <Vote auth={auth} {...props} />
          }} />

          <Route key="reset" path="/reset" render={(props) => {
              const headers = { 'Authorization': `Bearer ${auth.getAccessToken()}` }
              axios.post(`${API_URL}/reset/`,{}, { headers });
              return <Redirect to={{
                pathname: '/vote',
                state: { from: props.location }
              }} />
          }} />
          {/*
          <Route key="selectroom" path="/selectroom" render={(props) =>
            auth.getRoomId() != null ?
              <Redirect to={{
                pathname: '/vote',
                state: { from: props.location }
              }} /> :
              <RoomChoise auth={auth} />}
          />
            */}
          <Route path="/dashboard" render={(props) => <Dashboard auth={auth} {...props} />} />
        </div>
      </Router>
    );
  }
}

export default App;
