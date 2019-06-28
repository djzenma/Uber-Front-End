import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {Divider} from "@material-ui/core";


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
            <div>
                <Form className ="w-50 mx-auto">
                    <h2 className ="h2">{this.props.heading}</h2>
                    {this.displayFormGroups()}
                    <Button variant={this.props.btnColor} type="submit">
                        {this.props.btnTxt}
                    </Button>
                </Form>
                <Divider className="mt-2"/>
            </div>
        );
    }

}