import React, {Component} from 'react';
import './App.css';

import {Rider} from './Components/Rider';
import Profile from './Components/Profile';
import RidesHistory from './Components/RidesHistory';
import SignIn from './Components/SignInPage';
import SignUp from './Components/SignUpPage';
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
        this.onSignUp = this.onSignUp.bind(this);
        this.onRedirectToSignIn = this.onRedirectToSignIn.bind(this);
        this.onRedirectToSignUp = this.onRedirectToSignUp.bind(this);

        this.state = {
            login: false,
            signUp: true,
            rider: false,
            driver: false,
            profile: false,
            ridesHistory: false,
            role: 'rider'
        };
    }

    onMapClick() {
        this.setState({
            login: false,
            signUp: false,
            rider: true,
            driver: false,
            profile: false,
            ridesHistory: false
        });
    }

    onRiderProfileClick() {
        this.setState({
            login: false,
            signUp: false,
            rider: false,
            driver: false,
            profile: true,
            ridesHistory: false
        });
    }

    onRiderRidesHistoryClick() {
        this.setState({
            login: false,
            signUp: false,
            rider: false,
            driver: false,
            profile: false,
            ridesHistory: true
        });
    }

    onLogin(credentials) {
        const role = credentials.role;
        if(role === 'rider')
            this.setState({
                login: false,
                signUp: false,
                rider: true,
                driver: false,
                profile: false,
                ridesHistory: false,
                role: role
            });
        else if(role === 'driver')
            this.setState({
                login: false,
                signUp: false,
                rider: false,
                driver: true,
                profile: false,
                ridesHistory: false,
                role: role
            });
    }

    onSignUp(credentials) {
        const role = credentials.role;
        if(role === 'rider')
            this.setState({
                login: false,
                signUp: false,
                rider: true,
                driver: false,
                profile: false,
                ridesHistory: false,
                role: role
            });
        else if(role === 'driver')
            this.setState({
                login: false,
                signUp: false,
                rider: false,
                driver: true,
                profile: false,
                ridesHistory: false,
                role: role
            });
    }

    onRedirectToSignIn() {
        this.setState({
            login: true,
            signUp: false,
            rider: false,
            driver: false,
            profile: false,
            ridesHistory: false
        });
    }

    onRedirectToSignUp() {
        this.setState({
            login: false,
            signUp: true,
            rider: false,
            driver: false,
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

        if(this.state.login)
            page = <SignIn onLogin={this.onLogin} onRedirectToSignUp={this.onRedirectToSignUp}/>;

        else if(this.state.signUp)
            page = <SignUp onSignUp={this.onSignUp} onRedirectToSignIn={this.onRedirectToSignIn}/>;

        else if(this.state.profile)
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

        else if(this.state.rider)
            page = <Rider riderProfile={riderProfile}
                          cancelFee={cancelFee}
                          leftDrawer={<LeftDrawer onMyProfileClick={this.onRiderProfileClick}
                                                   onMyRidesHistoryClick={this.onRiderRidesHistoryClick}
                                                  onMapClick={this.onMapClick}/>}
                    />;

        else if(this.state.driver)
            page = <Driver rideLocation="Embaba" fare={30} rider="Lawa7ez" profile={driverProfile}/>;

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