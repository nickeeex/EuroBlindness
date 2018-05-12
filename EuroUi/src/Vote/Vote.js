import React, { Component } from 'react';
import { PanelGroup, Panel, FormGroup, Form, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from './../constants';
import Callback from './../Callback/Callback';
import NumericInput from 'react-numeric-input';

class Vote extends Component {
  
    constructor(props, context) {
        super(props, context);
        
        this.handleChange = this.handleChange.bind(this);
        this.handleActiveKey = this.handleActiveKey.bind(this);

        this.state = {
            roomData: null,
            activeKey: ''
        };
    }

    componentWillMount() {
        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        return axios.get(`${API_URL}/vote/`,{ headers }).then((result) => {
            this.setState({roomData: result.data})
        });
    }

    getValidationState(countryId, categoryId) {
        const votes = this.state.roomData.contestants.find((contestant) => contestant.contestantId === countryId).votes;
        
        var notCorrectPoints = Number.parseInt(votes[categoryId], 10) < 0 || Number.parseInt(votes[categoryId], 10) > 12;

        if(notCorrectPoints) {
            return 'error';
        }
        return null;
    }

    handleChange = (voteData) => {
        voteData.points = voteData.points == null ? 0 : voteData.points;
        voteData.points = voteData.points > 12 ? 12 : voteData.points;
        voteData.points = voteData.points < 0 ? 0 : voteData.points;

        if(this.state.roomData.contestants[voteData.index].votes[voteData.categoryId] == voteData.points) return;

        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        axios.post(`${API_URL}/vote/`,{  
            categoryId: voteData.categoryId,
            contestantId: voteData.contestantId,
            points: voteData.points
        }, { headers }).then((result) => {
            this.setPoint(voteData);
        }).catch((error) => {
            console.log("MEGA ERROR - Should not come here ever");
        });
    }

    setPoint = (voteData) => {
        const stateCopy = Object.assign({}, this.state.roomData);
        stateCopy.contestants[voteData.index].votes[voteData.categoryId] = voteData.points;
        this.setState({ roomData: stateCopy});
        
    }

    handleActiveKey(activeKey){
        if(this.state.activeKey === activeKey){
            activeKey = -1;
        }
        this.setState({activeKey: activeKey})
    }

    averageScore = (votes) => {
        let total = Object.entries(votes).reduce((total, current) => {var x = (isNaN(Number.parseFloat(current[1])) ? 0 : Number.parseFloat(current[1])); return total + x;}, 0);
        if(Object.keys(votes).length === 0 || isNaN(total)) {
            return 0;
        }
        return (total / this.state.roomData.categories.length);
    }

    render() {
        if(!this.state.roomData) return <Callback />; 
        var countryPanels = this.state.roomData.contestants.map((contestant, i) => {
            return  <Panel key={contestant.contestantName} eventKey={contestant.contestantName} >
                        <div className="panelHeading" onClick={() => this.handleActiveKey(contestant.contestantName)}>
                        <Panel.Heading>
                            <div className="flag"><img src={"../images/flags/round/png/"+contestant.countryName.toLowerCase().replace(" ", "-")+".png"} alt="flag"/></div>
                            <div className="contryArtistContainer">
                                <div className="countryName">{contestant.countryName}</div>
                            </div>
                            <div className="averageScore">{this.averageScore(contestant.votes)}</div>
                        </Panel.Heading>
                        </div>
                        {
                            this.state.activeKey === contestant.contestantName ? (
                                <Panel.Body style={{height: 480}} collapsible>
                                    <div className="contestantPicture">
                                        <img src={"../images/contestants/" + contestant.countryName.toLowerCase().replace(" ", "-") + ".jpg"} alt={contestant.countryId} />
                                    </div>
                                    <div className="contestantInfo">
                                        <div className="name">{contestant.contestantName}</div>
                                        <div className="song">{contestant.entryName}</div>
                                    </div>
                                    <Form className="categoryForm">
                                            {[].concat(this.state.roomData.categories).sort((a,b) => a.categoryId > b.categoryId).map((category, j) => {
                                                return  <FormGroup className="category" key={category.categoryName} controlId="formInlineName" bsSize="small" validationState={this.getValidationState(contestant.contestantId, category.categoryId)}>
                                                            <ControlLabel>{category.categoryName}</ControlLabel>
                                                            <NumericInput className="form-control" min={0} max={12} step={1} value={contestant.votes[category.categoryId] || 0} onChange={(e) => this.handleChange({points: e, "index": i, "contestantId": contestant.contestantId, "categoryId": category.categoryId })} />
                                                        </FormGroup>  
                                            })}
                                        
                                    </Form>
                                    <div className="officialLink">
                                        <a target="_blank" href={contestant.officialPageUri} >Official Eurovision page</a>
                                    </div>
                                    <div className="youtube">
                                        <a target="_blank" href={"https://www.youtube.com/watch?v="+contestant.youTubeUri+"?rel=0"} >Youtube</a>
                                    </div>
                                </Panel.Body>
                            ) : (
                                <Panel.Body style={{height: 480}} collapsible>
                                </Panel.Body>
                            )
                        }
                        
                    </Panel>
        });

        return (
            <PanelGroup accordion id="accordion" activeKey={this.state.activeKey} onSelect={this.handleActiveKey}>
                {countryPanels}
            </PanelGroup>
        );
    }
}
    
export default Vote;