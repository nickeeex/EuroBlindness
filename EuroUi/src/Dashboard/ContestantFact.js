import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class ContestantFact extends Component {
  
    constructor(props, context) {
        super(props, context);
        this.state = {
        value: ''
        };
    }
    
    render() {
        return (
            <Grid className="data-panel category-panel">
                <div className="dashboard-top-label">CONTESTANT FACT - {this.props.contestant.countryName}</div>
                <Row className="top-rank-row">
                    <Col xs={6} sm={6} md={6} lg={6} className="category-col">
                        <div className="contestant-fact-picture">
                            {
                                !this.props.contestant.countryName ? null :
                                <img src={"./images/contestants/"+this.props.contestant.countryName.toLowerCase().replace(" ", "-")+".jpg"} alt={this.props.contestant.countryName} />
                            }
                            
                        </div>
                    </Col>
                    {!this.props.contestant.categories ? null :
                    <Col xs={6} sm={6} md={6} lg={6} className="category-col">
                        <div className="contestant-fact-info">
                            <div className="info-container">
                                <label className="contestant-fact-text-label">This guy likes the whole package</label>
                                {
                                    !this.props.contestant.categories.overall ? null :
                                    this.props.contestant.categories.overall.split(",").map((user) => {
                                        return <label className="contestant-fact-name-label" key={user}>{user}</label>
                                    })
                                }
                            </div>
                        </div>
                        <div className="contestant-fact-info">
                        <div className="info-container">
                            <label className="contestant-fact-text-label">This guy would sing karaoke to this song</label>
                            {
                                !this.props.contestant.categories.song ? null :
                                this.props.contestant.categories.song.split(",").map((user) => {
                                    return <label className="contestant-fact-name-label" key={user}>{user}</label>
                                })
                            }
                            </div>
                        </div>
                        <div className="contestant-fact-info">
                        <div className="info-container">
                            <label className="contestant-fact-text-label">This guy would love to be part of the backup dance team</label>
                            {
                                !this.props.contestant.categories.show ? null :
                                this.props.contestant.categories.show.split(",").map((user) => {
                                    return <label className="contestant-fact-name-label" key={user}>{user}</label>
                                })
                            }
                            </div>
                        </div>
                        <div className="contestant-fact-info">
                            <div className="info-container">
                                <label className="contestant-fact-text-label">This guy FUCKS!</label>
                                {
                                    !this.props.contestant.categories.panisin ? null :
                                    this.props.contestant.categories.panisin.split(",").map((user) => {
                                        return <label className="contestant-fact-name-label" key={user}>{user}</label>
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                    }
                </Row>
            </Grid>
        )
}

}

export default ContestantFact;