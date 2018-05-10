import React, { Component } from 'react';
import { PanelGroup, Panel, FormGroup, FormControl, Form, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from './../constants';
import Callback from './../Callback/Callback';

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
        return 'success';
    }

    handleChange = (voteData) => {
        return (e) => {

            let point = e.target.value;

            voteData.points = point;

            const { getAccessToken } = this.props.auth;
            const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
            axios.post(`${API_URL}/vote/`,{  
                categoryId: voteData.categoryId,
                contestantId: voteData.contestantId,
                points: voteData.points
            }, { headers }).then((result) => {
                this.setPoint(voteData);
            }).catch((error) => {
                this.setPoint(voteData);
            });
            
            //point = (point < 0 ? 0 : point > 12 ? 12 : point);
            
            
            
            
            
        }
    }

    setPoint = (voteData) => {
        const stateCopy = Object.assign({}, this.state.roomData);
        console.log(voteData);
        stateCopy.contestants[voteData.index].votes[voteData.categoryId] = voteData.points;

        //WAIT FOR DATA!!
        this.setState({ roomData: stateCopy});
    }

    handleActiveKey(activeKey){
        if(this.state.activeKey === activeKey){
            activeKey = -1;
        }
        this.setState({activeKey: activeKey})
    }

    averageScore = (votes) => {
        let total = Object.values(votes).reduce((total, current) => total + current.value, 0);
        console.log(total);
        if(Object.keys(votes).length === 0) {
            return 0;
        }
        console.log("Keys length: " + Object.keys(votes));
        return (total.points / this.state.roomData.categories.length);
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
                                <div className="artistSong">{contestant.contestantName} - {contestant.entryName}</div>
                            </div>
                            <div className="averageScore">{this.averageScore(contestant.votes)}</div>
                        </Panel.Heading>
                        </div>
                        <Panel.Body collapsible>
                            <Form>
                                
                                    {[].concat(this.state.roomData.categories).sort((a,b) => a.categoryId > b.categoryId).map((category, j) => {
                                        return  <FormGroup key={category.categoryName} controlId="formInlineName" bsSize="small" validationState={this.getValidationState(contestant.contestantId, category.categoryId)}>
                                                    <ControlLabel>{category.categoryName}</ControlLabel>
                                                    <FormControl type="number" min="0" max="12" value={contestant.votes[category.categoryId] || 0 } placeholder="" onChange={this.handleChange({"index": i, "contestantId": contestant.contestantId, "categoryId": category.categoryId })} />
                                                </FormGroup>  
                                    })}
                                
                            </Form>
                        </Panel.Body>
                    </Panel>
        });

        return (
            <PanelGroup accordion id="accordion-example" activeKey={this.state.activeKey} onSelect={this.handleActiveKey}>
                {countryPanels}
            </PanelGroup>
        );
    }
}
    
export default Vote;