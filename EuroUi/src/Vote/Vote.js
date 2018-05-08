import React, { Component } from 'react';
import { PanelGroup, Panel, FormGroup, FormControl, Form, Button, ControlLabel } from 'react-bootstrap';
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

    getValidationState(id) {
        const voteData = this.state.value.countries.find((country) => country.id === id).voteData;
        var notCorrectPoints = voteData.find((vote) => Number.parseInt(vote.points, 10) < 0 || Number.parseInt(vote.points, 10) > 10);

        if(notCorrectPoints !== undefined) {
            return 'error';
        }
        return 'success';
    }

    checkButtonStatus(id) {
        if(this.getValidationState(id) === 'success') {
            return false;
        }
        return true;
    }

    handleChange = (data) => {
        return (e) => {
            let value = this.state.value;
            let countries = value.countries.map((country) => {
                if(country.id === data.country) {
                    let voteData = country.voteData.map((vote) => {
                        if(vote.id === data.category) {
                            return Object.assign({}, vote, {points: e.target.value});
                        }
                        return vote;
                    });
                    return Object.assign({}, country, {voteData: voteData});
                }  
                return country;
            });
            value.countries = countries; 
            this.setState({ value: value });
        }
    }

    sendVote = (id) => {
        let voteData = this.state.value.countries.find((country) => country.id === id).voteData;
        //Send that shit!!
        this.handleActiveKey(-1);
    }

    handleActiveKey(activeKey){
        this.setState({activeKey})
    }

    render() {
        var countryPanels = [].concat(this.state.value.countries).sort((a,b) => a.startingPosition > b.startingPosition).map((country, i) => {
            return  <Panel key={i} eventKey={i} >
                        <Panel.Heading>
                            <Panel.Title toggle>{country.name} {country.artist} - {country.song}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Form>
                                <FormGroup controlId="formInlineName" bsSize="small" validationState={this.getValidationState(country.id)}>
                                    {[].concat(country.voteData).sort((a,b) => a.id > b.id).map((category, i) => {
                                        return  <div key={i}>
                                                    <ControlLabel>{category.name}</ControlLabel>
                                                    <FormControl type="number" min="1" max="10" value={category.points} placeholder="" onChange={this.handleChange({ "country": country.id, "category": category.id })} />
                                                </div>
                                                
                                                
                                    })}
                                </FormGroup>
                                <Button onClick={() => this.sendVote(country.id)} disabled={this.checkButtonStatus(country.id)}>Save</Button>
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