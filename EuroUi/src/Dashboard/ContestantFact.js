import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from 'recharts';

class ContestantFact extends Component {
  
    constructor(props, context) {
        super(props, context);
        this.state = {
        value: ''
        };
    }
    
    render() {

        const data = [
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181}
        ];

        return (
            <Grid className="data-panel category-panel">
                <div className="dashboard-top-label">CONTESTANT FACT</div>
                <Row className="top-rank-row">
                    <Col xs={6} sm={6} md={6} lg={6} className="category-col">
                        <div className="contestant-fact-picture">
                        <img src="./images/contestants/finland.jpg" alt="asd" />
                        </div>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} className="category-col">
                        <div className="contestant-fact-info">A</div>
                        <div className="contestant-fact-info">B</div>
                        <div className="contestant-fact-info">C</div>
                        <div className="contestant-fact-info">D</div>
                    </Col>
                </Row>
            </Grid>
        )
}

}

export default ContestantFact;