import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';


class Select extends Component {
  
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
    this.props.onRoomInfo({bla: "bla"})
  }

  createRoom = () => {
    console.log(this.state.value);
    this.renewToken();
    this.props.onRoomInfo({bla: "bla"})
  }

    render() {
      return (
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
                onClick={this.createRoom}
            >
                Create Room
            </Button>
            </form>
        </div>
      );
    }
  }
  
  export default Select;