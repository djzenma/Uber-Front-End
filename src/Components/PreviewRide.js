import React, {Component} from 'react';
import {Card, FormControl, Button} from "react-bootstrap";


class PreviewRide extends Component {
    render() {
        return(
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>Preview Ride</Card.Title>
                        <Card.Text>
                            Start: {this.props.startLoc.name}<br/>
                            End: {this.props.endLoc.name}<br/>
                            <FormControl placeholder="Enter Promo Code" onChange={(e) => this.props.onPromoCodeChange(e.target.value)}/>
                        </Card.Text>
                        <Card.Footer>
                            <Button variant="primary" onClick={this.props.onLookForDriverClick}>Look for a driver!</Button>
                        </Card.Footer>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}




export default PreviewRide;