import React, { Component } from 'react';
import { PanelGroup, Panel, FormGroup, FormControl, Form, ControlLabel } from 'react-bootstrap';
import myData from './data.json';

class Vote extends Component {
  
    constructor(props, context) {
        super(props, context);
        //FETCH DATA - now using data from data.json
        this.handleChange = this.handleChange.bind(this);
        this.handleActiveKey = this.handleActiveKey.bind(this);

        this.state = {
            value: myData,
            activeKey: '1'
        };
    }

    getValidationState(countryId, categoryId) {
        const votes = this.state.value.contestants.find((contestant) => contestant.contestantId === countryId).votes;
        var notCorrectPoints = votes.find((vote) => vote.id === categoryId && (Number.parseInt(vote.points, 10) < 0 || Number.parseInt(vote.points, 10) > 10));

        if(notCorrectPoints !== undefined) {
            return 'error';
        }
        return 'success';
    }

    handleChange = (changedVote) => {
        return (e) => {


            let point = Number.parseFloat(e.target.value);
            point = (point < 0 ? 0 : point > 12 ? 12 : point);
             
            console.log(point);
            changedVote.points = point;
            
            this.sendVote(changedVote);
            
            //WAIT FOR DATA!!
            let value = this.state.value;
            let contestants = value.contestants.map((contestant) => {
                if(contestant.id === changedVote.country) {
                    let voteData = contestant.voteData.map((vote) => {
                        if(vote.id === changedVote.category) {
                            return Object.assign({}, vote, {points: e.target.value});
                        }
                        return vote;
                    });
                    return Object.assign({}, contestant, {votes: voteData});
                }  
                return contestant;
            });
            value.contestants = contestants; 
            this.setState({ value: value });
            
            
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
        this.setState({activeKey})
    }

    averageScore = (votes) => {
        let total = Object.values(votes).reduce((total, current) => total + current.value, 0);
        console.log(total);
        return (total.points / Object.keys(votes).length);
    }

    render() {
        var countryPanels = [].concat(this.state.value.contestants).sort((a,b) => a.startingOrder > b.startingOrder).map((contestant, i) => {
            return  <Panel key={i} eventKey={i} >
                        <div className="panelHeading" onClick={() => this.handleActiveKey(i)}>
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
                                
                                    {[].concat(contestant.votes).sort((a,b) => a.key > b.key).map((vote, i) => {
                                        return  <FormGroup key={i} controlId="formInlineName" bsSize="small" validationState={this.getValidationState(contestant.contestantId, vote.key)}>
                                                    <ControlLabel >{this.state.value.categories.find((cat) => cat.categoryId === vote.key).categoryName}</ControlLabel>
                                                    <FormControl type="number" min="1" max="10" value={vote.value} placeholder="" onChange={this.handleChange({ "country": contestant.contestantId, "category": vote.key })} />
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