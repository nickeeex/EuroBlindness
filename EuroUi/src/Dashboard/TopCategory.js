import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Cell} from 'recharts';

class TopCategory extends Component {
  
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
        ];

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
                            <BarChart className="categoryBar" layout="vertical" data={data}>
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" />
                                <Bar type="monotone" dataKey="uv" barSize={30}>
                                    {
                                        data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index]}/>
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} className="category-col">
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
                <Row className="category-row">
                    <Col xs={6} sm={6} md={6} lg={6} className="category-col">
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
                    <Col xs={6} sm={6} md={6} lg={6} className="category-col">
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

export default TopCategory;