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
                            <span className="text-info">Ride Date</span>: {this.props.rides[index].ridedate.substr(0,10)}
                        </Card.Title>
                        <Card.Text>
                            <span className="text-primary">Driver</span>: {this.props.rides[index].driveremail}<br/>
                            <span className="text-primary">Rider</span>: {this.props.rides[index].rideremail}<br/>
                            <span className="text-primary">Start Location</span>: {this.props.rides[index].fare_s}
                            <span className="text-primary">End Location</span>: {this.props.rides[index].fare_e}
                        </Card.Text>

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
