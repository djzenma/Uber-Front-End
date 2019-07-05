import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


export default class MyForm extends Component {
    constructor(props) {
        super(props);
        this.displayFormGroups = this.displayFormGroups.bind(this);
        this.inputChange = this.inputChange.bind(this) ;
        this.onChange = this.onChange.bind(this) ;

        const forms = this.displayFormGroups();
        this.state = {
            inputs: forms[1],
            forms: forms[0],
            expanded: false
        };
    }

    displayFormGroups() {
        let inputs = [];
        let form = this.props.formGroups.map((group, index) => {
            inputs.push({id: group.id, input: ''});
            return (
                <Form.Group controlId={group.id} key={group.id}>
                    <Form.Label>{group.label}</Form.Label>
                    <Form.Control type={group.type} placeholder={group.placeHolder} onChange = {(e)=>this.inputChange(e, group.id)} />
                </Form.Group>
            );
        });

        return [form, inputs];
    }

    inputChange (e, id)
    {
        e.persist();
        this.setState((prevState)=>{
            let arr = prevState.inputs;
            const updated = arr.map((val) => {
                if(val.id === id)
                    return {id: id, input: e.target.value };
                else
                    return val;
            });
            return {inputs: updated};
        });
        // this.setState({input[id]: e.target.value});
    }

    onChange(e, expanded) {
        this.setState({expanded: expanded});
    }

    render() {
        return (
            <div className="w-100 mb-3">
                <ExpansionPanel expanded={this.state.expanded} onChange={this.onChange}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">

                        <h3 className="h5">{this.props.heading}</h3>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Form className="w-100">
                            {this.state.forms}
                            <Button variant={this.props.btnColor} type="submit"   onClick={(e)=>{
                                e.preventDefault(); //does not go back to login page
                                this.props.onClickingbutton(this.state.inputs);
                                this.setState({expanded: false});
                            }}>
                                {this.props.btnTxt}
                            </Button>
                        </Form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }

}
