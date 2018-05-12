import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import Panel from './Panel';
import TopCategory from './TopCategory';
import TopRank from './TopRank';
import TopScore from './TopScore';
import ContestantFact from './ContestantFact';
//import axios from 'axios';
//import { API_URL } from './../constants';

class Dashboard extends Component {
  
    constructor(props, context) {
        super(props, context);

        this.state = {
            dashboard: null,
        };
    }
    /*
    componentWillMount() {
        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        return axios.get(`${API_URL}/dashboard/`,{ headers }).then((result) => {
            this.setState({dashboard: result.data})
        });
    }
    */

    goBack = () => {
        console.log("back");
        this.props.history.replace('/');
    }

    render() {
    return (
        <div>
        <Glyphicon glyph="remove" className="back-button" onClick={this.goBack} />
        <Grid className="dashboard-grid">
            <Row className="dashboard-row">
                <Col xs={12} sm={6} md={6} lg={6} className="dashboard-panel">
                    <TopCategory dashboard="this.state.dashboard" />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="dashboard-panel">
                    <TopRank dashboard="this.state.dashboard" />
                </Col>
            </Row>
            <Row className="dashboard-row">
                <Col xs={12} sm={6} md={6} lg={6} className="dashboard-panel">
                    <TopScore dashboard="RADAR CHART" />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="dashboard-panel">
                    <ContestantFact dashboard="PANISIN" />
                </Col>
            </Row>
        </Grid>
        </div>
    );
    }
}
    
export default Dashboard;