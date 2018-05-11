import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Login from './Login/Login';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import Vote from './Vote/Vote';
import Dashboard from './Dashboard/Dashboard';
import history from './history';

const auth = new Auth();

class App extends Component {

  handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    }
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) =>
            !auth.isAuthenticated() ?
              <Login auth={auth} {...props} /> :
              props.location.pathname === "/dashboard" ? null :
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
            console.log(JSON.stringify(props));
            return <Vote auth={auth} {...props} />
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
