import {Card} from "react-bootstrap";
import React, {Component} from "react";

class WelcomeCard extends Component {
    render() {
        let hasBalance = true;
        if(!this.props.credit)
            hasBalance = false;
        return(
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>Hello {this.props.name}!</Card.Title>
                        <Card.Header>
                            {this.props.name}, {this.props.age} years old.<br/>
                            <span hidden={!hasBalance}>Your balance is {this.props.credit}EGP.</span>
                        </Card.Header>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}


export default WelcomeCard;