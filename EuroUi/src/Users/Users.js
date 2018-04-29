import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';

class Users extends Component {
  
constructor(props, context) {
    super(props, context);
    this.state = {
    value: ''
    };
}


    render() {
    return (
        <div>
            Users
        </div>
    );
    }
}
    
    export default Users;