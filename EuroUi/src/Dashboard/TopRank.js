import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Cell} from 'recharts';
import ContestantFlag from './ContestantFlag';
class TopRank extends Component {
  
    constructor(props, context) {
        super(props, context);
        this.state = {
        value: ''
        };
    }

    getContestants = (x) => {
        return this.props.dashboard.contestants[x.contestantId];
    }
    
    render() {
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
                            <BarChart className="categoryBar" layout="vertical" data={this.props.dashboard.top}>
                                <XAxis type="number" />
                                <YAxis type="category" tick={(props) => <ContestantFlag {...props} />} dataKey={this.getContestants} />
                                <Bar type="monotone" dataKey="points" barSize={30}>
                                    {
                                        this.props.dashboard.top.map((entry, index) => (
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