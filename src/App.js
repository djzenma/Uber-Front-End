import React, {Component} from 'react';
import './App.css';

import {Rider} from './Components/Rider';
import Profile from './Components/Profile';
import RidesHistory from './Components/RidesHistory';
import {GoogleApiWrapper} from "google-maps-react";

const apiKey = "AIzaSyADdCfBug07EnHeVDoRmQExesiwKbgCOC4";

class App extends Component{

    constructor(props) {
        super(props);

        this.onRiderProfileClick = this.onRiderProfileClick.bind(this);
        this.onRiderRidesHistoryClick = this.onRiderRidesHistoryClick.bind(this);

        this.state = {
            profile: false,
            ridesHistory: true
        };
    }

    onRiderProfileClick() {
        this.setState({
            profile: true,
            ridesHistory: false
        });
    }

    onRiderRidesHistoryClick() {
        this.setState({
            profile: false,
            ridesHistory: true
        });
    }


    render() {
        let page;
        let riderProfile = {
            name: "Mazen",
            age: 21,
            credit: 107,
            email: 'eidma@aucegypt.edu',
            birthDate: '05/12/97'
        };
        let cancelFee = 10;
        let rides = [
            {   date: '24/06/19',
                driverName: 'Soko Loko',
                fare: 60,
                status: 'Finished'
            },
            {   date: '25/06/19',
                driverName: 'Safa7 Embaba',
                fare: 10,
                status: 'Cancelled because of terrifying driver name'
            }
        ];

        if(this.state.profile)
            page =
                <div>
                    <Profile profile={riderProfile}/>
                </div>;
        else if(this.state.ridesHistory)
            page =
                <div>
                    <RidesHistory rides={rides}/>
                </div>;
        else
            page = <Rider riderProfile={riderProfile} cancelFee={cancelFee}
                          onRiderProfileClick={this.onRiderProfileClick}
                          onRiderRidesHistoryClick={this.onRiderRidesHistoryClick}/>;

        return (
            <div className="App">
                {page}
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: apiKey
})(App);