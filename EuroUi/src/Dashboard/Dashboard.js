import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Panel from './Panel';
class Dashboard extends Component {
  
constructor(props, context) {
    super(props, context);
    this.state = {
    value: ''
    };
}


    render() {
    return (
        <Grid className="dashboard-grid">
            <Row className="dashboard-row">
                <Col xs={12} sm={6} md={6} lg={6} className="dashboard-panel">
                    <Panel />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="dashboard-panel">
                    <Panel />
                </Col>
            </Row>
            <Row className="dashboard-row">
                <Col xs={12} sm={6} md={6} lg={6} className="dashboard-panel">
                    <Panel />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="dashboard-panel">
                    <Panel />
                </Col>
            </Row>
        </Grid>
    );
    }
}
    
export default Dashboard;