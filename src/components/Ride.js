import React, {Component} from 'react';
import {Button, Card} from "react-bootstrap";
export class Ride extends Component {
    render ()
    {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>Ride Notification</Card.Title>
                        <Card.Header>
                        </Card.Header>
                        <Card.Text>
                            Rider: {this.props.rider} <br/>
                            Destination:  {this.props.rideLocation} <br/>
                            Expected Fare: {this.props.fare} EGP
                        </Card.Text>
                        <Card.Footer>
                            <Button variant="success" onClick={this.props.onArrivedRider}>Arrived Rider</Button>

                        </Card.Footer>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}