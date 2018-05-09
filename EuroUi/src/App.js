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

const auth = new Auth();

const unlisten = history.listen((location, action) => {
  console.log(action, location.pathname, location.state);
});

class App extends Component {

  handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication().then((x) => {
        console.log(x);
      })
    }
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      roomData: null
    };
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) =>
            !auth.isAuthenticated() ?
              <Login auth={auth} {...props} /> :
              <NavigationBar auth={auth} {...props} />}
          />

          <Route key="callback" path="/callback" render={(props) => {
            this.handleAuthentication(props);
            return <Callback {...props} />
          }} />

          <Route key="vote" path="/vote" render={(props) => {
            return <Vote roomId={auth.getRoomId()} auth={auth} {...props} />
          }} />

          <Route key="selectroom" path="/selectroom" render={(props) =>
            auth.getRoomId() != null ?
              <Redirect to={{
                pathname: '/vote',
                state: { from: props.location }
              }} /> :
              <RoomChoise auth={auth} />}
          />

          <Route path="/dashboard" render={(props) => <Dashboard auth={auth} {...props} />} />
        </div>
      </Router>
    );
  }
}

export default App;
