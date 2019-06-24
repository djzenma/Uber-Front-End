import React, {Component} from 'react';
import {Card} from "react-bootstrap";

export default class RidesHistory extends Component{
    constructor(props) {
        super(props);

        this.mapArrayToCards = this.mapArrayToCards.bind(this);
    }

    mapArrayToCards() {
        return this.props.rides.map((ride, index) => {
            return(
                <Card key={index} className="w-50 mt-3 mx-auto">
                    <Card.Body>
                        <Card.Title>
                            <span className="text-info">Ride Date</span>: {ride.date}
                        </Card.Title>
                        <Card.Text>
                            <span className="text-primary">Driver</span>: {ride.driverName}<br/>
                            <span className="text-primary">Fare</span>: {ride.fare}EGP
                        </Card.Text>
                        <Card.Footer>
                            <span className="text-danger">Status</span>: {ride.status}
                        </Card.Footer>
                    </Card.Body>
                </Card>
            );
        });
    }

    render() {
        return (
            <div className="w-100">
                {this.mapArrayToCards()}
            </div>
        );
    }
}
