import React, {Component} from 'react';
import MapContainer from "./Map";
import WelcomeCard from './WelcomeCard';
import PreviewRide from './PreviewRide';
import ProgressBar from './Progress';
import {Button, Alert, Card} from 'react-bootstrap';

export class Rider extends Component{

    constructor(props) {
        super(props);

        this.onRideClick = this.onRideClick.bind(this);
        this.onMarkerClicked = this.onMarkerClicked.bind(this);
        this.onPromoCodeEnter = this.onPromoCodeEnter.bind(this);
        this.onBeginRide = this.onBeginRide.bind(this);
        this.onCancelRide = this.onCancelRide.bind(this);
        this.onDismissClick = this.onDismissClick.bind(this);
        this.pollForDriver = this.pollForDriver.bind(this);

        this.state = {
            isProcessingRide: false,
            isStartLoc: false,
            preview: false,
            startLoc: null,
            endLoc: null,
            promoCode: null,
            rideRunning: false,
            showReceipt: false,
            searchingDriver: false,
            driverName: "Hamada Sheraton",
            fare: 60,
            pollCount: 0,
            pollFun: null
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
            }
            else {  // End location
                this.setState({isProcessingRide: false, endLoc: area, preview: true});
            }
        }
    }

    onPromoCodeEnter(promo) {
        this.setState({promoCode: promo});
    }

    onBeginRide() {
        // Send my start and end locations with my profile (name, email, password)
        // Receive dirver name and fare
        const body = {
            startLoc: this.state.startLoc.name,
            endLoc: this.state.endLoc.name,
            profile: this.props.riderProfile
        };
        const url = 'http://localhost:3000/ride';
        fetch( url,
        { method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
            })
            .then((res)=> {
                res.json()
                    .then((resJson) => {
                        this.setState({fare: resJson.fare});
                    });
                const pollFun = setInterval(this.pollForDriver, 1000);
                this.setState({preview: false, searchingDriver: true, pollFun: pollFun});
            });
    }

    pollForDriver() {
        // Notif?
        let count = this.state.pollCount;
        const notifUrl = 'http://localhost:3000/rider/' + this.props.riderProfile.email;
        fetch( notifUrl, { method: 'GET',})
            .then((res) => {
                if(res.status === 200) {
                    res.json()
                        .then((resJson) => {
                            clearInterval(this.state.pollFun);
                            this.setState({preview: false, rideRunning: true, searchingDriver: false,
                                driverName: resJson});
                            console.log("driver received");
                            console.log(resJson);
                        });
                }
            });
        if(this.state.pollCount > 30) {
            clearInterval(this.state.pollFun);
            this.setState({
                isProcessingRide: false,
                isStartLoc: false,
                preview: false,
                rideRunning: false,
                showReceipt: false,
                searchingDriver: false
            });
        }
        this.setState({pollCount: ++count});
    }

    onCancelRide() {
        // TODO:: Get cancelation fee from BE via App.js
        this.setState({rideRunning: false, showReceipt: true, cancelFee: this.props.cancelFee});
    }

    onDismissClick() {
        // Reset the screen
        this.setState({isProcessingRide: false,
            isStartLoc: false,
            preview: false,
            startLoc: null,
            endLoc: null,
            promoCode: null,
            rideRunning: false,
            showReceipt: false});
    }


    render() {
        let targetLoc, previewCard = "", btnTxt = "Start a ride!", rideCard, receiptCard, searchingDriver= null;

        console.log(this.state.searchingDriver);
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
                    <PreviewRide
                                 startLoc={this.state.startLoc}
                                 endLoc={this.state.endLoc}
                                 onPromoCodeChange={this.onPromoCodeEnter}
                                 onLookForDriverClick={this.onBeginRide}
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
                            <Card.Title>
                                Nice Ride!
                            </Card.Title>
                            <Card.Header>
                                Driver: {this.state.driverName}
                            </Card.Header>
                            <Card.Text>
                                Expected Fare: {this.state.fare}EGP
                            </Card.Text>

                        </Card.Body>
                    </Card>
                    <div className="col-4"/>
                </div>;
        }
        else if(this.state.searchingDriver) {
            searchingDriver = <div className="row fixed-bottom mb-5">
                <div className="col-3"/>
                <ProgressBar className="col-6"/>
                <div className="col-3"/>
            </div>;
        }
        else if(this.state.showReceipt) {
            receiptCard =
                <div className="row fixed-bottom mb-5">
                    <div className="col-4"/>
                    <Card className="col-4">
                        <Card.Body>
                            <Card.Title>
                                Receipt
                            </Card.Title>
                            <Card.Header>
                                Driver: {this.state.driverName}
                            </Card.Header>
                            <Card.Text>
                                Payment: {this.state.cancelFee}
                            </Card.Text>
                            <Card.Footer>
                                <Button variant="primary" onClick={this.onDismissClick}>Dismiss</Button>
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



                <div className="container-fluid">
                    <div className="row">

                        {/*Left Drawer*/}
                        <div className="col mt-3">
                            {this.props.leftDrawer}
                        </div>{/*col*/}

                        <div className="col-3">
                        </div>

                        <div className="col-4 mt-5">
                            <div hidden={!this.state.isProcessingRide}>
                                <Alert variant="primary">
                                    Select Your {targetLoc} Location!
                                </Alert>
                            </div>
                        </div>

                        {/*Welcome Card*/}
                        <div className="col-3 mt-5">
                            <WelcomeCard name={this.props.riderProfile.name} age={this.props.riderProfile.age} credit={this.props.riderProfile.credit}/>
                        </div> {/*col*/}

                        <div className="col-1">
                        </div>{/*col*/}
                    </div>{/*row*/}

                    {/*Start ride Btn*/}
                    <div className="row fixed-bottom mb-5" hidden={this.state.isProcessingRide || this.state.preview || this.state.rideRunning || this.state.searchingDriver}>
                        <div className="col">
                            <Button variant="primary" onClick={this.onRideClick}>{btnTxt}</Button>
                        </div>
                    </div>

                    {/*Preview The Ride and wait for Beginning*/}
                    {previewCard}

                    {/*Ride running*/}
                    {rideCard}

                    {/*Receipt*/}
                    {receiptCard}

                    {/* Searching For driver progress bar*/}
                    {searchingDriver}

                </div>{/*container*/}


            </div>
        );
    }
}