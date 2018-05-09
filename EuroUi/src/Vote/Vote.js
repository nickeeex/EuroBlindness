import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from './../constants';

class Vote extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: ''
        };
    }

    register = () => {
        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        axios.post(`${API_URL}/register/`,{}, { headers })
    }

    getRoomData = () => {
        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        axios.get(`${API_URL}/vote/`,{ headers })
    }

    vote = () => {
        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        axios.post(`${API_URL}/vote/`,{  
            categoryId: 25,
            contestantId: 1,
            points: 5
        }, { headers })
    }
    componentDidMount() {
        console.log("mounted")
    }

    render() {
        return (
            <div>
                <Button onClick={this.register}> register </Button>
                <Button onClick={this.getRoomData}> getRoomData </Button>
                <Button onClick={this.vote}> vote </Button>
                {this.props.roomData}
            </div>
        );
    }
}

export default Vote;