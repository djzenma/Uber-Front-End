import React, {Component} from 'react';
import {Card, FormControl, Button} from "react-bootstrap";


class PreviewRide extends Component {
    render() {
        return(
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>Preview Ride</Card.Title>
                        <Card.Header>
                            Driver: {this.props.driverName}
                        </Card.Header>
                        <Card.Text>
                            Start: {this.props.startLoc.lat}, {this.props.startLoc.lng}<br/>
                            End: {this.props.endLoc.lat}, {this.props.endLoc.lng}<br/>
                            Expected Fare: {this.props.fare}EGP
                            <FormControl placeholder="Enter Promo Code" onChange={(e) => this.props.onPromoCodeChange(e.target.value)}/>
                        </Card.Text>
                        <Card.Footer>
                            <Button variant="primary" onClick={this.props.onBeginRideClick}>Begin Ride!</Button>
                        </Card.Footer>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}




export default PreviewRide;