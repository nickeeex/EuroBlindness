import React, {Component} from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import App from './App';
import Login from './Login/Login';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import Vote from './Vote/Vote';
import Users from './Users/Users';
import Dashboard from './Dashboard/Dashboard';
import history from './history';

const auth = new Auth();



class MainRoutes extends Component {

  handleAuthentication = ({location}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      if(auth.handleAuthentication() != null) {
        this.handleRecievedData({bla: "ROOM ID FOUND IN TOKEN!"});
      }
    }
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      roomData: {}
    };
  }

  handleRecievedData = (data) => {
    this.setState({roomData: data});
  }

  render() {
  return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => (
            auth.isAuthenticated() ? (
              <App auth={auth} {...props} /> 
            ):(
              <Login auth={auth} {...props} />
            )
          )}/>
          <Route path="/home" render={(props) => (
            auth.isAuthenticated() ? (
              this.state.roomData.bla != null ? ( 
                <Redirect to={{
                  pathname: '/vote',
                  state: { from: props.location }
                }}/>
              ) : (
                <Home auth={auth} onRoomInfo={this.handleRecievedData} {...props} />
              )
            ) : (
              <Redirect to={{
                pathname: '/',
                state: { from: props.location }
              }}/>
            )
          )}/>
          <Route path="/callback" render={(props) => {
            this.handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
          <Route path="/vote" render={(props) => <Vote roomData={this.state.roomData} auth={auth} {...props} />} />
          <Route path="/users" render={(props) => <Users auth={auth} {...props} />} />
          <Route path="/dashboard" render={(props) => <Dashboard auth={auth} {...props} />} />
        </div>
      </Router>
  );
  }
}

export default MainRoutes;