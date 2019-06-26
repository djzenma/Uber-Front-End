import {Card} from "react-bootstrap";
import React, {Component} from "react";

class WelcomeCard extends Component {
    render() {
        return(
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>Hello {this.props.name}!</Card.Title>
                        <Card.Header>
                            {this.props.name}, {this.props.age} years old.
                        </Card.Header>
                        <Card.Text>
                            Your balance is {this.props.credit}EGP.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}


export default WelcomeCard;