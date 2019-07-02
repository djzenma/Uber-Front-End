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
import ProgressBar from './Progress';


export class Driver extends Component {

    constructor(props) {
        super(props);
        this.onMarkerClicked = this.onMarkerClicked.bind(this);
        this.onCancelledRide = this.onCancelledRide.bind(this);
        this.onEndedRide = this.onEndedRide.bind(this);
        this.onArrivedRider = this.onArrivedRider.bind(this);
        this.pollForRide = this.pollForRide.bind(this);
        this.onAcceptingRides = this.onAcceptingRides.bind(this);

        this.state =
            {
                startLoc: null,
                endLoc : null,
                riderName: "",
                acceptingRides:false,
                marker : false ,
                arrivedRider : false ,
                endedRide : false ,
                cancelledRide:false ,
                foundRide: false,
                pollCount: 0,
                pollFun: null,
                fare :null
            };
    }


    onMarkerClicked(area)
    {
        this.setState({
            startLoc: area.name ,
            endLoc : null,
            pollCount: 0,
            pollFun: null,
            acceptingRides:true,
            arrivedRider : false ,
            endedRide : false ,
            marker : true ,
            cancelledRide:false ,
            foundRide: false});
        this.onAcceptingRides();
    }

    onAcceptingRides(){
            this.setState({pollCount: 0});
            const poll = window.setInterval(this.pollForRide, 1000);
            this.setState({pollFun: poll});
    }



    pollForRide() {
        let count = this.state.pollCount;
        let pollFun = this.state.pollFun;
        console.log(pollFun);

        const body = {
            driverEmail: this.props.profile.email,
            loc: this.state.startLoc
        };
        const url = 'http://localhost:3000/driver';
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
                        .then((resJson) => {
                            this.setState({
                                riderName: resJson.name,
                                fare: resJson.fare,
                                endLoc: resJson.endLoc,
                                acceptingRides: false,
                                arrivedRider: false,
                                marker : false ,
                                endedRide: false,
                                cancelledRide: false,
                                foundRide: true,
                            });
                            window.clearInterval(pollFun);
                        });
                }
            });


        this.setState({pollCount: ++count});
        if(this.state.pollCount > 10) {
            clearInterval(this.state.pollFun);
            this.setState({
                acceptingRides:true,
                arrivedRider : false ,
                marker : false ,
                endedRide : false ,
                cancelledRide:false ,
                foundRide : false ,
            });
        }

    }

    onEndedRide()
    {
        const body = {
            driverEmail: this.props.profile.email,
        };
        const url = 'http://localhost:3000/driver/ended';
        fetch( url,
            { method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then((res)=> {
                if(res.status === 200) {
                    this.setState({
                                startLoc : this.state.endLoc ,
                                acceptingRides: true,
                                arrivedRider: false,
                                marker : false ,
                                endedRide: true,
                                cancelledRide: false,
                                foundRide: false,
                            });

                }
                 this.onAcceptingRides();
                console.log("Ending Ride");

            });

    }
    onCancelledRide()
    {
        this.setState({
            acceptingRides:false,
            arrivedRider : false ,
            endedRide : false ,
            cancelledRide:true ,
            marker : false ,
            foundRide: false});
        console.log("Cancelling Ride");
    }


    onArrivedRider()
    {
        this.setState({
            acceptingRides:false,
            arrivedRider : true ,
            endedRide : false ,
            marker : false ,
            cancelledRide:false ,
            foundRide: false});
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
                    <AlertDismissible3 fare = {this.state.fare}/>
                    <ProgressBar/>
                </div>
                <div className="col-4"/>
            </div>

    }
     else
      if (this.state.acceptingRides && this.state.marker)
     {
         msg2=
         <div className="row fixed-bottom mb-5" hidden={!this.state.acceptingRides}>
             <div className="col-4">
             </div>
             <div className="col-4">
                 <div className="row">
                     <AlertDismissible location = {this.state.startLoc} />
                 </div>
                 <div className="row">
                     <ProgressBar/>
                 </div>
             </div>
             <div className="col-4"/>
         </div>;

     }
     else if (this.state.foundRide)
     {
            msg =
                <div className="row fixed-bottom mb-5" hidden={!this.state.foundRide}>
                    <div className="col-4">
                    </div>
                    <div className="col-4">
                        <div  hidden = {this.state.arrivedRider  || this.state.cancelledRide}>
                            <Ride  rideLocation = {this.state.endLoc} rider = {this.state.riderName} fare ={this.state.fare}
                                   onCancelledRide={this.onCancelledRide} onArrivedRider={this.onArrivedRider}/>
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
                         <EndRide  rideLocation = {this.state.endLoc} rider = {this.state.riderName}
                                    onEndedRide={this.onEndedRide}/>
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

