import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Panel extends Component {
  
constructor(props, context) {
    super(props, context);
    this.state = {
    value: ''
    };
}


    render() {
        return (
            <Grid className="data-panel">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} >
                       {this.props.dashboard}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
    
export default Panel;