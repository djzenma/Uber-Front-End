import React, {Component} from 'react';
import {Button, Card} from "react-bootstrap";
export default class EndRide extends Component {
    render ()
    {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>Ride State</Card.Title>
                        <Card.Header>
                        </Card.Header>
                        <Card.Text>
                            Please Select {this.props.rider}'s Ride State to {this.props.rideLocation}
                        </Card.Text>
                        <Card.Footer>
                            <Button variant="success" onClick={this.props.onEndedRide}>End Ride</Button>
                            <Button variant="danger" onClick={this.props.onCancelledRide}>Cancel Ride</Button>

                        </Card.Footer>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}