import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, 
    PolarAngleAxis, PolarRadiusAxis} from 'recharts';

class TopScore extends Component {
  
    constructor(props, context) {
        super(props, context);
        this.state = {
        value: ''
        };
    }
    
    render() {
        return (
            <Grid className="data-panel category-panel">
                <div className="dashboard-top-label">TOP VOTER</div>
                <Row className="top-rank-row">
                    <Col xs={12} sm={12} md={12} lg={12} className="category-col">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={this.props.dashboard.topVoters}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey={(e) => this.props.dashboard.users[e.user]} />
                                <PolarRadiusAxis/>
                                <Radar name="Mike" dataKey="points" stroke="#003300" fill="#00ff00" fillOpacity={0.6}/>
                            </RadarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </Grid>
        )
}

}

export default TopScore;