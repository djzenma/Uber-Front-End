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
import Admin from './Components/Admin';

const path = require('path');

const apiKey = "AIzaSyADdCfBug07EnHeVDoRmQExesiwKbgCOC4";
const baseUrl = 'http://localhost:3000';

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
            login: true,
            signUp: false,
            rider: false,
            driver: false,
            profile: false,
            admin: false,
            ridesHistory: false,
            role: 'rider',
            profileInfo: {}
        };
    }

    onMapClick() {
        if(this.state.role === 'rider')
            this.setState({
                login: false,
                signUp: false,
                rider: true,
                driver: false,
                admin: false,
                profile: false,
                ridesHistory: false
            });
        else if(this.state.role === 'driver')
            this.setState({
                login: false,
                signUp: false,
                rider: false,
                driver: true,
                admin: false,
                profile: false,
                ridesHistory: false
            });
        else
            this.setState({
                login: false,
                signUp: false,
                rider: false,
                driver: false,
                admin: true,
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
            admin: false,
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
            admin: false,
            profile: false,
            ridesHistory: true
        });
    }

    onLogin(credentials) {
        const url = 'http://localhost:3000/auth';
        fetch( url,
            { method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)}
                )
            .then((res)=> {
                res.json()
                    .then((resJson)=> {
                        console.log(resJson);
                        let profile = resJson;
                        profile.birthDate = resJson.bdate;
                        profile.age = new Date().getFullYear() - parseInt(resJson.bdate.substr(0,4));
                        this.setState({
                            profileInfo: resJson
                        });
                    }).catch((er)=> console.log(er));

                if(res.status === 200) {    // If auth succeeded
                    const role = credentials.role;
                    if (role === 'rider')
                        this.setState({
                            login: false,
                            signUp: false,
                            rider: true,
                            driver: false,
                            admin: false,
                            profile: false,
                            ridesHistory: false,
                            role: role
                        });
                    else if (role === 'driver')
                        this.setState({
                            login: false,
                            signUp: false,
                            rider: false,
                            driver: true,
                            admin: false,
                            profile: false,
                            ridesHistory: false,
                            role: role
                        });
                    else
                        this.setState({
                            login: false,
                            signUp: false,
                            rider: false,
                            driver: false,
                            admin: true,
                            profile: false,
                            ridesHistory: false,
                            role: role
                        });
                }
            })
            .catch((e)=>{   // Failed
                console.log(e);
            });
    }

    onSignUp(credentials) {
        const url = 'http://localhost:3000/auth/signup';
        fetch( url,
            { method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)}
        )
        .then((res)=> {
            if(res.status === 200) {
                credentials.age = new Date().getFullYear() - parseInt(credentials.bdate.substr(0,4));
                const role = credentials.role;
                if(role === 'rider')
                    this.setState({
                        login: false,
                        signUp: false,
                        rider: true,
                        driver: false,
                        admin: false,
                        profile: false,
                        ridesHistory: false,
                        role: role,
                        profileInfo: credentials
                    });
                else if(role === 'driver')
                    this.setState({
                        login: false,
                        signUp: false,
                        rider: false,
                        driver: true,
                        admin: false,
                        profile: false,
                        ridesHistory: false,
                        role: role,
                        profileInfo: credentials
                    });
                else
                    this.setState({
                        login: false,
                        signUp: false,
                        rider: false,
                        driver: false,
                        admin: true,
                        profile: false,
                        ridesHistory: false,
                        role: role,
                        profileInfo: credentials
                    });
            }
        });
    }

    onRedirectToSignIn() {
        this.setState({
            login: true,
            signUp: false,
            rider: false,
            driver: false,
            admin: false,
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
            admin: false,
            profile: false,
            ridesHistory: false
        });
    }

    render() {
        let page;

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
                    <Profile profile={this.state.profileInfo}/>
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
            page = <Rider riderProfile={this.state.profileInfo}
                          cancelFee={cancelFee}
                          leftDrawer={<LeftDrawer onMyProfileClick={this.onRiderProfileClick}
                                                   onMyRidesHistoryClick={this.onRiderRidesHistoryClick}
                                                  onMapClick={this.onMapClick}/>}
                    />;

        else if(this.state.driver)
            page =
                <div>
                    <Driver  profile={this.state.profileInfo}/>
                    <div className="container-fluid fixed-top mt-3">
                        <div className="row">
                            <div className="col-1">
                                <LeftDrawer onMyProfileClick={this.onRiderProfileClick}
                                        onMyRidesHistoryClick={this.onRiderRidesHistoryClick}
                                        onMapClick={this.onMapClick}/>
                            </div>
                        </div>
                    </div>
                </div>;

        else if(this.state.admin)
            page = <Admin profile={this.state.profileInfo}/>;

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