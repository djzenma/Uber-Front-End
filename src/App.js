import React, {Component} from 'react';
import './App.css';

import {Rider} from './Components/Rider';
import Profile from './Components/Profile';
import RidesHistory from './Components/RidesHistory';
import SignIn from './Components/SignInPage';
import {Driver} from './Components/Driver';
import {GoogleApiWrapper} from "google-maps-react";
import LeftDrawer from "./Components/LeftDrawer";

const apiKey = "AIzaSyADdCfBug07EnHeVDoRmQExesiwKbgCOC4";

class App extends Component{

    constructor(props) {
        super(props);

        this.onRiderProfileClick = this.onRiderProfileClick.bind(this);
        this.onRiderRidesHistoryClick = this.onRiderRidesHistoryClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.onLogin = this.onLogin.bind(this);

        this.state = {
            login: true,
            map: false,
            profile: false,
            ridesHistory: false
        };
    }

    onMapClick() {
        this.setState({
            login: false,
            map: true,
            profile: false,
            ridesHistory: false
        });
    }

    onRiderProfileClick() {
        this.setState({
            login: false,
            map: false,
            profile: true,
            ridesHistory: false
        });
    }

    onRiderRidesHistoryClick() {
        this.setState({
            login: false,
            map: false,
            profile: false,
            ridesHistory: true
        });
    }

    onLogin() {
        console.log('login');
        this.setState({
            login: false,
            map: true,
            profile: false,
            ridesHistory: false
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
        let driverProfile = {
            name: "3ala2 el 7ara2",
            age: 70,
            credit: -2,
            email: '7ara2@aucegypt.edu',
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
                <div className="container-fluid">
                    <div className="row m-3">
                        <LeftDrawer className="col" onMyProfileClick={this.onRiderProfileClick}
                                    onMyRidesHistoryClick={this.onRiderRidesHistoryClick}
                                    onMapClick={this.onMapClick}/>
                    </div>
                    <Profile profile={riderProfile}/>
                </div>;
        else if(this.state.ridesHistory)
            page =
                <div className="container-fluid">
                    <div className="row m-3">
                        <LeftDrawer className="col" onMyProfileClick={this.onRiderProfileClick}
                                    onMyRidesHistoryClick={this.onRiderRidesHistoryClick}
                                    onMapClick={this.onMapClick}/>
                    </div>
                    <RidesHistory className="clearfix" rides={rides}/>
                </div>;
        else if(this.state.login)
            page = <SignIn onLogin={() => this.onLogin()}/>;
        else if(this.state.map)
            page = <Rider riderProfile={riderProfile}
                          cancelFee={cancelFee}
                          leftDrawer={<LeftDrawer onMyProfileClick={this.onRiderProfileClick}
                                                   onMyRidesHistoryClick={this.onRiderRidesHistoryClick}
                                                  onMapClick={this.onMapClick}/>}
                    />;

        return (
            <div className="App">
                <Driver name={driverProfile.name} age={driverProfile.age} credit={driverProfile.credit} rideLocation = "Zamalek" rider ={riderProfile.name} fare ="60" />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: apiKey
})(App);