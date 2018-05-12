import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Cell} from 'recharts';
import ContestantFlag from './ContestantFlag';

class TopCategory extends Component {
  
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
            "#ffd700",
            "#c0c0c0",
            "#cd7f32"
        ]

        return (
            
            <Grid className="data-panel category-panel">
                <div className="dashboard-top-label">TOP CATEGORIES</div>
                <Row className="category-row">
                    <Col xs={6} sm={6} md={6} lg={6} className="category-col">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart className="categoryBar" margin={{left: 12}} layout="vertical" data={this.props.dashboard.topPerCategory["1"].votes}>
                                <XAxis type="number" />
                                <YAxis type="category" tick={(props) => <ContestantFlag {...props} />} dataKey={this.getContestants} label={{ value: this.props.dashboard.categories["1"], angle: -90, position: 'left' }}/>
                                <Bar type="monotone" dataKey="points" barSize={30}>
                                    {
                                        this.props.dashboard.topPerCategory["1"].votes.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index]}/>
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} className="category-col">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart className="categoryBar" margin={{left: 12}} layout="vertical" data={this.props.dashboard.topPerCategory["2"].votes}>
                                <XAxis type="number" />
                                <YAxis type="category" tick={(props) => <ContestantFlag {...props} />} dataKey={this.getContestants} label={{ value: this.props.dashboard.categories["2"], angle: -90, position: 'left' }} />
                                <Bar type="monotone" dataKey="points" barSize={30}>
                                    {
                                        this.props.dashboard.topPerCategory["1"].votes.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index]}/>
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
                <Row className="category-row">
                    <Col xs={6} sm={6} md={6} lg={6} className="category-col">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart className="categoryBar" margin={{left: 12}} layout="vertical" data={this.props.dashboard.topPerCategory["3"].votes}>
                                <XAxis type="number" />
                                <YAxis type="category" tick={(props) => <ContestantFlag {...props} />} dataKey={this.getContestants} label={{ value: this.props.dashboard.categories["3"], angle: -90, position: 'left' }} />
                                <Bar type="monotone" dataKey="points" barSize={30}>
                                    {
                                        this.props.dashboard.topPerCategory["1"].votes.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index]}/>
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} className="category-col">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart className="categoryBar" margin={{left: 12}} layout="vertical" data={this.props.dashboard.topPerCategory["4"].votes}>
                                <XAxis type="number" />
                                <YAxis type="category" tick={(props) => <ContestantFlag {...props } />} dataKey={this.getContestants} label={{ value: this.props.dashboard.categories["4"], angle: -90, position: 'left' }} />
                                <Bar type="monotone" dataKey="points" barSize={30}>
                                    {
                                        this.props.dashboard.topPerCategory["1"].votes.map((entry, index) => (
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

export default TopCategory;