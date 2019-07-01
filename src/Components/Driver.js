import React, {Component} from 'react';
import './../App.css';
import WelcomeCard from "./WelcomeCard";
import MapContainer from "./Map";
import {Alert, Button, Card} from "react-bootstrap";
import {AlertDismissible} from './AlertDismissible';
import {AlertDismissible2} from './AlertDismissible2';
import {AlertDismissible3} from './AlertDismissible3';
import {Ride} from './Ride';
import EndRide from './EndRide';
import ArrivedRider from './ArrivedRider';



export class Driver extends Component {

    constructor(props) {
        super(props);
        this.onMarkerClicked = this.onMarkerClicked.bind(this);
        this.onRejectedRide = this.onRejectedRide.bind(this);
        this.onAcceptedRide = this.onAcceptedRide.bind(this);
        this.onCancelledRide = this.onCancelledRide.bind(this);
        this.onEndedRide = this.onEndedRide.bind(this);
        this.onArrivedRider = this.onArrivedRider.bind(this);


        this.state =
            {
                startLoc: null,
                endLoc : null,
                riderName: "",
                acceptedRide: false ,
                rejectedRide : false ,
                acceptingRides:false,
                arrivedRider : false ,
                endedRide : false ,
                cancelledRide:false ,
                onRide:false,
            };
    }


    onMarkerClicked(area) {
        let end = false;
        let count = 0;
        const url = 'http://localhost:3000/driver/';
        const body = {
            driverEmail: this.props.profile.email,
            loc: this.state.startLoc
        };
        while(!end && count<20000000) {
            fetch( url,
                { method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                })
                .then((res)=> {
                    if(res.status === 200) {
                        res.json()
                            .then((resJson)=> {
                                this.setState({
                                    riderName: resJson.name, endLoc: resJson.endLoc,
                                    arrivedRider : false ,rejectedRide : false ,
                                    acceptedRide : false , acceptingRides: true ,
                                    cancelledRide : false , endedRide: false ,
                                    onRide : false , startLoc: area});
                            });
                    }
                });

        }

    }
    onRejectedRide()
    {
        this.setState({arrivedRider : false ,rejectedRide : true , acceptedRide : false , acceptingRides: true , cancelledRide : false , endedRide :false ,onRide : false});
        console.log("Rejecting Ride");
        console.log(this.state.rejectedRide);
    }

    onEndedRide()
    {
        this.setState({arrivedRider : false ,rejectedRide : false , acceptedRide : false , acceptingRides: true , cancelledRide : false , endedRide :true ,onRide : false , startLoc: this.props.rideLocation});
        console.log("Ending Ride");

    }
    onCancelledRide()
    {
        this.setState({arrivedRider : false ,rejectedRide : false , acceptedRide : false , acceptingRides: true , cancelledRide : true , endedRide :false, onRide : false});
        console.log("Cancelling Ride");
    }

    onAcceptedRide()
    {
        this.setState({arrivedRider : false ,rejectedRide : false , acceptedRide : true , acceptingRides: false , cancelledRide : false , endedRide :false, onRide : false});
        console.log("Accepting Ride");
        console.log(this.state.acceptedRide);
    }

    onArrivedRider()
    {
        this.setState({arrivedRider : true ,rejectedRide : false , acceptedRide : true , acceptingRides: false , cancelledRide : false , endedRide :false, onRide : true});
        console.log("On Way to Rider");
    }

    render(){
        let msg ;
        let msg2 ;
        let msg3 ;
        let msg4 ;
     if (this.state.endedRide)
    {
        msg3 =
            <div className="row fixed-bottom mb-5" hidden={!this.state.endedRide}>
                <div className="col-4">
                </div>
                <div className="col-4">
                    <AlertDismissible2 location = {this.state.startLoc}/>
                    <AlertDismissible3 fare = {this.props.fare}/>
                </div>
                <div className="col-4"/>
            </div>

    }
     else if (this.state.acceptingRides)
        {
            msg =
                <div className="row fixed-bottom mb-5" hidden={!this.state.acceptingRides}>
                    <div className="col-4">
                    </div>
                    <div className="col-4">
                        <AlertDismissible location = {this.state.startLoc} />
                        <div  hidden = {this.state.rejectedRide || this.state.acceptedRide}>
                            <Ride  rideLocation = {this.state.endLoc} rider = {this.state.riderName} fare ={this.props.fare}
                                   onRejectedRide={this.onRejectedRide} onAcceptedRide={this.onAcceptedRide}/>
                        </div>
                    </div>
                    <div className="col-4"/>
                </div>;
        }
     else if (this.state.arrivedRider)
     {
         msg4 =
             <div className="row fixed-bottom mb-5" hidden={!this.state.arrivedRider}>
                 <div className="col-4"/>
                 <div className="col-4">

                     <div  hidden = {this.state.endedRide || this.state.cancelledRide}>
                         <EndRide  rideLocation = {this.props.rideLocation} rider = {this.props.rider}
                                   onCancelledRide={this.onCancelledRide} onEndedRide={this.onEndedRide}/>
                     </div>
                     <div className="col-4"/>
                 </div>
             </div>;
     }
        else if (this.state.acceptedRide)
        {
            msg2 =
                <div className="row fixed-bottom mb-5" hidden={!this.state.acceptedRide}>
                    <div className="col-4"/>
                    <div className="col-4">
                        <div  hidden = {this.state.arrivedRider  || this.state.cancelledRide}>
                            <ArrivedRider rider = {this.props.rider}
                                          onCancelledRide={this.onCancelledRide} onArrivedRider={this.onArrivedRider}/>
                        </div>
                        <div className="col-4"/>
                    </div>
                </div>;
        }


        return (
            <div className="App">

                {/*The Map*/}
                <MapContainer className="map"
                              google={window.google}
                              onMarkerClicked = {this.onMarkerClicked} />


                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                        </div>{/*col*/}
                        <div className="col-4 mt-5">
                            <Alert variant="primary">
                                Select Your current Location!
                            </Alert>
                        </div>

                        <div className="col-3 mt-5">
                            <WelcomeCard name={this.props.profile.name} age={this.props.profile.age} credit={this.props.profile.credit}  />
                        </div> {/*col*/}
                        <div className="col-2">
                        </div>{/*col*/}
                    </div>{/*row*/}
                    {msg}

                </div>

                {msg2}
                {msg3}
                {msg4}
            </div>
        );
    }
}

