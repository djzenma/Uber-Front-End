import React, {Component} from 'react';
import './../App.css';
import {MapContainer} from "./Map";
import WelcomeCard from './WelcomeCard';
import PreviewRide from './PreviewRide';
import {Button, Alert, Card} from 'react-bootstrap';

export class Rider extends Component{

    constructor(props) {
        super(props);
        this.onRideClick = this.onRideClick.bind(this);
        this.onMarkerClicked = this.onMarkerClicked.bind(this);
        this.onPromoCodeEnter = this.onPromoCodeEnter.bind(this);
        this.onBeginRide = this.onBeginRide.bind(this);
        this.onCancelRide = this.onCancelRide.bind(this);

        this.state = {
            isProcessingRide: false,
            isStartLoc: false,
            preview: false,
            startLoc: null,
            endLoc: null,
            promoCode: null,
            rideRunning: false,
            driverName: "Hamada Sheraton",
            fare: 60
        };
    }

    onRideClick() {
        if(!this.state.isProcessingRide)    // Clicked Start ride
            this.setState({isProcessingRide: true, isStartLoc: true, preview: false});
    };

    onMarkerClicked(area) {
        if (this.state.isProcessingRide) {
            if (this.state.isStartLoc) {
                this.setState({isProcessingRide: true, isStartLoc: false, preview: false, startLoc: area});
                console.log("Start");
                console.log(area);
            }
            else {  // End location
                this.setState({isProcessingRide: false, endLoc: area, preview: true});
                console.log("end");
                console.log(area);
            }
        }
    }

    onPromoCodeEnter(promo) {
        this.setState({promoCode: promo});
    }

    onBeginRide() {
        this.setState({preview: false, rideRunning: true});
    }

    onCancelRide() {

    }


    render() {
        let targetLoc, previewCard = "", btnTxt = "Start a ride!", rideCard;
        if(this.state.isProcessingRide && this.state.isStartLoc) {  // Choosing a starting location
            targetLoc = "Starting";
        }
        else if(this.state.isProcessingRide && !this.state.isStartLoc && !this.state.preview){ // Choosing an end location
            targetLoc = "Ending";
        }
        else if(this.state.preview) {
            previewCard = <div className="row fixed-bottom mb-5" hidden={!this.state.preview}>
                <div className="col-4"/>
                <div className="col-4">
                    <PreviewRide driverName={this.state.driverName}
                                 startLoc={this.state.startLoc}
                                 endLoc={this.state.endLoc}
                                 fare={this.state.fare}
                                 onPromoCodeChange={this.onPromoCodeEnter}
                                 onBeginRideClick={this.onBeginRide}
                    />
                </div>
                <div className="col-4"/>
            </div>;
        }
        else if(this.state.rideRunning) {
            rideCard =
                <div className="row fixed-bottom mb-5">
                    <div className="col-4"/>
                    <Card className="col-4">
                        <Card.Body>
                            <Card.Header>
                                {this.state.driverName}
                            </Card.Header>
                            <Card.Text>
                                Expected Fare: {this.state.fare}
                            </Card.Text>
                            <Card.Footer>
                                <Button variant="primary" onClick={this.onCancelRide}>Cancel the Ride</Button>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                    <div className="col-4"/>
                </div>;
        }


        return (
            <div className="App">
                {/*The Map*/}
                <MapContainer className="col-2"
                              google={window.google}
                              onMarkerClicked = {this.onMarkerClicked}
                />

                {/*Welcome Card*/}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                        </div>{/*col*/}

                        <div className="col-4 mt-5">
                            <div hidden={!this.state.isProcessingRide}>
                                <Alert variant="primary">
                                    Select Your {targetLoc} Location!
                                </Alert>
                            </div>
                        </div>

                        <div className="col-3 mt-5">
                            <WelcomeCard name={this.props.name} age={this.props.age} credit={this.props.credit}/>
                        </div> {/*col*/}
                        <div className="col-1">
                        </div>{/*col*/}
                    </div>{/*row*/}

                    {/*Start ride Btn*/}
                    <div className="row fixed-bottom mb-5" hidden={this.state.isProcessingRide || this.state.preview || this.state.rideRunning}>
                        <div className="col">
                            <Button variant="primary" onClick={this.onRideClick}>{btnTxt}</Button>
                        </div>
                    </div>

                    {/*Preview The Ride and wait for Beginning*/}
                    {previewCard}

                    {rideCard}

                </div>{/*container*/}


            </div>
        );
    }
}