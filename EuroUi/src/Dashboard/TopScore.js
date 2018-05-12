import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, PolarRadiusAxis} from 'recharts';

class TopScore extends Component {
  
    constructor(props, context) {
        super(props, context);
        this.state = {
        value: ''
        };
    }
    
    render() {

        const data = [
            { subject: 'Math', A: 120, B: 110, fullMark: 150 },
            { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
            { subject: 'English', A: 86, B: 130, fullMark: 150 },
            { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
            { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
            { subject: 'History', A: 65, B: 85, fullMark: 150 },
            { subject: 'asd', A: 85, B: 90, fullMark: 150 },
            { subject: 'asddd', A: 65, B: 85, fullMark: 150 },
        ];

        return (
            <Grid className="data-panel category-panel">
                <div className="dashboard-top-label">TOP VOTER</div>
                <Row className="top-rank-row">
                    <Col xs={12} sm={12} md={12} lg={12} className="category-col">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={data}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis/>
                                <Radar name="Mike" dataKey="A" stroke="#003300" fill="#00ff00" fillOpacity={0.6}/>
                            </RadarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </Grid>
        )
}

}

export default TopScore;