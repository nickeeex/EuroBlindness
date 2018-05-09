/*import React, { Component } from 'react';
import { API_URL } from './../constants';
import Select from './../Select/Select';
import Vote from './../Vote/Vote';
import axios from 'axios';

class Home extends Component {

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
    axios.post(`${API_URL}/room/`,{}, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  onDataRecieved = (data) => {
    this.props.onRoomInfo(data);
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      message: ''
    };
  }

  render() {
   
    const { isAuthenticated, getToken } = this.props.auth;
    return (
      <div className="container">
        {!getToken().roomId && isAuthenticated() &&
          <div>
            <Select onRoomInfo={this.onDataRecieved} {...this.props}/>
        </div>}
      </div>
    );
  }
}

export default Home;
*/