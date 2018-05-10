import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';


class RoomChoise extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: ''
    };
  }

  renewToken = () => {
    this.props.auth.renewToken();
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  joinRoom = () => {
    console.log(this.state.value);
    this.renewToken();
  }

  render() {
    return (
      <div className="container">
        <div className="center">
          <form>
            <FormControl
              type="text"
              defaultValue=""
              placeholder="Enter room id to join or room name to create"
              onBlur={this.handleChange}
            />

            <Button
              id="joinRoomBtn"
              bsStyle="primary"
              className="btn-margin"
              onClick={this.joinRoom}
            >
              Join Room
            </Button>
            <Button
              id="createRoomBtn"
              bsStyle="primary"
              className="btn-margin"
              onClick={this.joinRoom}
            >
              Create Room
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default RoomChoise;