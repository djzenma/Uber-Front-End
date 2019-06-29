import React , {Component}from 'react';
import './../App.css';
import {Alert, Button, Card} from "react-bootstrap";


export default class ArrivedRider extends Component{

    render() {

        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>Ride Status</Card.Title>
                        <Card.Header>
                        </Card.Header>
                        <Card.Text>
                           Did You Reach {this.props.rider} ? <br/>

                        </Card.Text>
                        <Card.Footer>

                            <Button variant="success" onClick={this.props.onArrivedRider}>Reached Rider</Button>
                            <Button variant="danger" onClick={this.props.onCancelledRide}>Cancel Ride</Button>

                        </Card.Footer>
                    </Card.Body>
                </Card>
            </div>
        );

    }
}
