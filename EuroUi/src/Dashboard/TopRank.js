import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Cell} from 'recharts';

class TopRank extends Component {
  
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
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210}
        ];

        const colors = [
            "#9400D3",
            "#4B0082",
            "#0000FF",
            "#00FF00",
            "#FFFF00",
            "#FF7F00",
            "#FF0000"
        ]

        return (
            <Grid className="data-panel category-panel">
                <div className="dashboard-top-label">TOP RANK</div>
                <Row className="top-rank-row">
                    <Col xs={12} sm={12} md={12} lg={12} className="category-col">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart className="categoryBar" layout="vertical" data={data}>
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" />
                                <Bar type="monotone" dataKey="pv" barSize={30}>
                                    {
                                        data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index]}/>
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </Grid>
        )
}

}

export default TopRank;