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
            promoCode: "",
            rideRunning: false,
            showReceipt: false,
            searchingDriver: false,
            endPoll: false,
            driverName: "Hamada Sheraton",
            fare: 60,
            pollCount: 0,
            pollFun: null
        };
        console.log("Credit: " + this.props.riderProfile.credit);
    }

    onRideClick() {
        if(!this.state.isProcessingRide)    // Clicked Start ride
            this.setState({isProcessingRide: true,showReceipt: false, isStartLoc: true, endPoll: false, preview: false, pollCount: 0});
    };

    onMarkerClicked(area) {

        if (this.state.isProcessingRide) {
            if (this.state.isStartLoc) {
                this.setState({isProcessingRide: true,showReceipt: false, isStartLoc: false, preview: false, endPoll: false, startLoc: area});
            }
            else {  // End location
                this.setState({isProcessingRide: false,showReceipt: false, endLoc: area, endPoll: false, preview: true});
            }
        }
    }

    onPromoCodeEnter(promo) {
        this.setState({promoCode: promo,showReceipt: false });
    }

    onBeginRide() {
        // Send my start and end locations with my profile (name, email, password)
        // Receive dirver name and fare
        const body = {
            startLoc: this.state.startLoc.name,
            endLoc: this.state.endLoc.name,
            profile: this.props.riderProfile,
            promocode :  this.state.promoCode
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
                        this.setState({fare: resJson.fare ,showReceipt: false});
                    })
                    .catch(err => console.log(err));
                const pollFun = setInterval(this.pollForDriver, 1000);
                this.setState({showReceipt: false , preview: false, searchingDriver: true, endPoll: false, pollFun: pollFun});
            });
    }

    pollForDriver() {
        // Notif?
        let count = this.state.pollCount;
        if(this.state.showReceipt) {    //  Ride ended
            clearInterval(this.state.pollFun);
        }
        else {  // Ride either requested or still running
            const notifUrl = 'http://localhost:3000/rider/' + this.props.riderProfile.email;
            fetch(notifUrl, {method: 'GET',})
                .then((res) => {
                    if (res.status === 200) {   // Ride being requested and received successfully
                        res.json()
                            .then((resJson) => {
                                // Driver received
                                clearInterval(this.state.pollFun);
                                this.setState({
                                    preview: false, rideRunning: true, searchingDriver: false,
                                    driverName: resJson,showReceipt: false
                                });
                                console.log("Driver Found !!");

                                // poll to ask if the ride ended
                                const ridePoll = setInterval(this.pollForDriver, 1000);
                                this.setState({pollFun: ridePoll,showReceipt: false});
                            });
                    } else if (res.status === 404) {
                        res.json().then((json) => {
                                if (json.noRide !== undefined) {
                                    if (json.noRide && !this.state.endPoll) { // did not find ride
                                        this.setState({
                                            isProcessingRide: false,
                                            isStartLoc: false,
                                            preview: false,
                                            promoCode: null,
                                            rideRunning: false,
                                            showReceipt: false,
                                            searchingDriver: true,
                                        });
                                    }
                                    else {
                                        if (!this.state.endPoll)//ended
                                        {
                                            this.setState({
                                            preview: false,
                                            rideRunning: false,
                                            searchingDriver: false,
                                            isProcessingRide: false,
                                            isStartLoc: false,
                                            showReceipt: true,
                                        });}
                                }

                                }
                            }
                        );
                    }

                });
            if (this.state.pollCount > 30) {
                const body = {
                    startLoc: this.state.startLoc.name,
                    endLoc: this.state.endLoc.name,
                    profile: this.props.riderProfile
                };
                const url = 'http://localhost:3000/ride/nodriver';
                fetch( url,
                    { method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body)
                    })
                    .then((res)=> {
                        if(res.status === 200) { //successfully removed ride from db
                            this.setState({
                                isProcessingRide: false,
                                isStartLoc: false,
                                preview: false,
                                rideRunning: false,
                                showReceipt: false,
                                searchingDriver: false,
                                endPoll: true
                            });
                        }
                    });
                clearInterval(this.state.pollFun);
            }
            this.setState({showReceipt: false, pollCount: ++count});
        }
    }

    onCancelRide() {
        const url = `http://localhost:3000/rider/cancel/plz?email=${this.props.riderProfile.email}&sLoc=${this.state.startLoc.name}&eLoc=${this.state.endLoc.name}`;
        fetch( url, { method: 'GET'})
            .then((res) => {
                if(res.status === 200) {
                    console.log('Cancel Requested Pending...');
                    res.json().then((json)=> {
                        this.setState({rideRunning: false, showReceipt: true, cancelFee: json.cancelFee });
                    });
                }
            });

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
                                Found Your Ride !
                            </Card.Title>
                            <Card.Header>
                                Driver: {this.state.driverName}
                            </Card.Header>
                            <Card.Text>
                                Expected Fare: {this.state.fare}EGP
                            </Card.Text>
                            <Card.Footer>
                                <Button variant="danger" onClick={this.onCancelRide}>Cancelled Ride</Button>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                    <div className="col-4"/>
                </div>;
        }
        else
            if(this.state.searchingDriver)
            {
            searchingDriver = <div className="row fixed-bottom mb-5">
                <div className="col-3"/>
                <ProgressBar className="col-6"/>
                <div className="col-3"/>
            </div>;
             }
        else
            if(this.state.showReceipt) {
                console.log ("Showing Receipt");
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