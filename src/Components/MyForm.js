import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


export default class MyForm extends Component {
    constructor(props) {
        super(props);
        this.displayFormGroups = this.displayFormGroups.bind(this);
    }

    displayFormGroups() {
        return this.props.formGroups.map((group, index) => {
           return (
               <Form.Group controlId={group.id}>
                   <Form.Label>{group.label}</Form.Label>
                   <Form.Control type={group.type} placeholder={group.placeHolder} />
               </Form.Group>
           );
        });
    }

    render() {
        return (
            <div className="w-100 mb-3">
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">

                        <h3 className="h5">{this.props.heading}</h3>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Form className="w-100">
                            {this.displayFormGroups()}
                            <Button variant={this.props.btnColor} type="submit">
                                {this.props.btnTxt}
                            </Button>
                        </Form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }

}