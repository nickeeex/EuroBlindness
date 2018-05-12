import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import TopCategory from './TopCategory';
import TopRank from './TopRank';
import TopScore from './TopScore';
import ContestantFact from './ContestantFact';
import axios from 'axios';
import { API_URL } from './../constants';
import Callback from './../Callback/Callback';

class Dashboard extends Component {
  
    constructor(props, context) {
        super(props, context);

        this.state = {
            dashboard: null,
            contestantFact: null
        };
    }
    
    componentWillMount() {
        this.rankingTimer = null;
        this.contestantTimer = null;
        this.getRanking();
        this.getContestant();
    }

    componentWillUnmount() {
        clearTimeout(this.rankingTimer);
        clearTimeout(this.contestantTimer);
        
        this.rankingTimer = null;
        this.contestantTimer = null;
    }
    componentDidMount() {
        this.rankingTimer = setInterval(()=> this.getRanking(), 5000);
        this.contestantTimer = setInterval(()=> this.getContestant(), 10000);
    }

    getRanking = () => {
        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        axios.get(`${API_URL}/dashboard/ranking`,{ headers }).then((result) => {
            this.setState({dashboard: result.data})
        });
    }

    getContestant = () => {
        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        axios.get(`${API_URL}/dashboard/contestant`,{ headers }).then((result) => {
            this.setState({contestantFact: result.data})
        });
    }

    goBack = () => {
        console.log("back");
        this.props.history.replace('/');
    }

    render() {
        if(!this.state.dashboard || !this.state.contestantFact) return <Callback />;
    return (
        <div>
        <Glyphicon glyph="remove" className="back-button" onClick={this.goBack} />
        <Grid className="dashboard-grid">
            <Row className="dashboard-row">
                <Col xs={12} sm={6} md={6} lg={6} className="dashboard-panel">
                    <TopCategory dashboard={this.state.dashboard} />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="dashboard-panel">
                    <TopRank dashboard={this.state.dashboard} />
                </Col>
            </Row>
            <Row className="dashboard-row">
                <Col xs={12} sm={6} md={6} lg={6} className="dashboard-panel">
                    <TopScore dashboard={this.state.dashboard} />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="dashboard-panel">
                    <ContestantFact contestant={this.state.contestantFact} />
                </Col>
            </Row>
        </Grid>
        </div>
    );
    }
}
    
export default Dashboard;