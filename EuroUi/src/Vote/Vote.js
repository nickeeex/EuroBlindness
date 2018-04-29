import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';

class Vote extends Component {
  
constructor(props, context) {
    super(props, context);
    this.state = {
    value: ''
    };
}


    render() {
    return (
        <div>
            {this.props.roomData.bla}
        </div>
    );
    }
}
    
    export default Vote;