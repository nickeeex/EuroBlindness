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
        var notCorrectPoints = Object.entries(votes).find((vote) => vote.key === categoryId && (Number.parseInt(vote.value, 10) < 0 || Number.parseInt(vote.value, 10) > 10));

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
            
            //WAIT FOR DATA!!
            let value = this.state.value;
            let contestants = value.contestants.map((contestant) => {
                if(contestant.contestantId === changedVote.country) {
                    contestant.votes[changedVote.category] = point;
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
                                
                                    {[].concat(this.state.value.categories).sort((a,b) => a.categoryId > b.categoryId).map((category, i) => {
                                        return  <FormGroup key={i} controlId="formInlineName" bsSize="small" validationState={this.getValidationState(contestant.contestantId, category.categoryId)}>
                                                    <ControlLabel>{category.categoryName}</ControlLabel>
                                                    <FormControl type="number" min="1" max="10" value={contestant.votes[category.categoryId] || 0 } placeholder="" onChange={this.handleChange({ "country": contestant.contestantId, "category": category.categoryId })} />
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