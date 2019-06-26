import React, {Component} from 'react';
import './../App.css';
import WelcomeCard from "./WelcomeCard";
import MapContainer from "./Map";
import {Alert} from "react-bootstrap";
import {AlertDismissible} from './AlertDismissible';
import {Ride} from './Ride';




export class Driver extends Component {

    constructor(props) {
        super(props);
        this.onMarkerClicked = this.onMarkerClicked.bind(this);
        this.onRejectedRide = this.onRejectedRide.bind(this);
        this.onAcceptedRide = this.onAcceptedRide.bind(this);

        this.state =
            {
                startLoc: null,
                endLoc : null,
                acceptedRide: false ,
                rejectedRide : false ,
                acceptingRides:false,
                onRide:false,
            };
    }

    onMarkerClicked(area) {
        this.setState({acceptingRides:true , startLoc: area});
        console.log("Start");
        console.log(area);

    }
    onRejectedRide()
    {
        this.setState({rejectedRide : true , acceptedRide : false , acceptingRides: true});
        console.log("Rejecting Ride");
        console.log(this.state.rejectedRide);
    }

    onAcceptedRide()
    {
        this.setState({rejectedRide : false , acceptedRide : true , acceptingRides: false});
        console.log("Accepting Ride");
        console.log(this.state.acceptedRide);
    }
    render()
    {


        let msg ;

        if (this.state.acceptingRides)
        {
            msg =
                <div className="row fixed-bottom mb-5" hidden={!this.state.acceptingRides}>
                    <div className="col-4">
                    </div>
                    <div className="col-4">
                        <AlertDismissible location = {this.state.startLoc} />

                        <div  hidden = {this.state.rejectedRide || this.state.acceptedRide}>
                            <Ride  rideLocation = {this.props.rideLocation} rider = {this.props.rider} fare ={this.props.fare}
                                   onRejectedRide={this.onRejectedRide} onAcceptedRide={this.onAcceptedRide}/>
                        </div>
                    </div>
                    <div className="col-4"/>
                </div>


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
            </div>


        );
    }

}
