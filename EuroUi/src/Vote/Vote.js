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
    
    getRoomData = () => {
       
    }

    vote = () => {
        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        axios.post(`${API_URL}/vote/`,{  
            categoryId: 25,
            contestantId: 1,
            points: 5
        }, { headers })
    }

    getValidationState(countryId, categoryId) {
        const votes = this.state.roomData.contenstants.find((contestant) => contestant.contestantId === countryId).votes;
        var notCorrectPoints = Object.entries(votes).find((vote) => vote.key === categoryId && (Number.parseInt(vote.value, 10) < 0 || Number.parseInt(vote.value, 10) > 12));

        if(notCorrectPoints !== undefined) {
            return 'error';
        }
        return 'success';
    }

    handleChange = (changedVote) => {
        return (e) => {

            console.log(e.target.value);
            let point =e.target.value;
            //point = (point < 0 ? 0 : point > 12 ? 12 : point);
            
            console.log(point);
            changedVote.points = point;
            
            this.sendVote(changedVote);
            
            const stateCopy = Object.assign({}, this.state.roomData);

            stateCopy.contenstants[changedVote.index].votes[changedVote.category] = point;

            //WAIT FOR DATA!!
            this.setState({ roomData: stateCopy});
            
            
        }
    }

    sendVote = (vote) => {
        //console.log(vote.country);
        //console.log(vote.category);
        //console.log(vote.points);
        //Send that shit!!
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
        return (total.points / Object.keys(votes).length);
    }

    render() {
        if(!this.state.roomData) return <Callback />; 
        var countryPanels = this.state.roomData.contenstants.map((contestant, i) => {
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
                                                    <FormControl type="number" min="0" max="12" value={contestant.votes[category.categoryId] || 0 } placeholder="" onChange={this.handleChange({"index": i, "country": contestant.contestantId, "category": category.categoryId })} />
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