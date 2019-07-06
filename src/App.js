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
import MyForm from "./Components/MyForm";
import {Paper} from "@material-ui/core";

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
        this.onFavplacesClicked = this.onFavplacesClicked.bind(this);
        this.addFav = this.addFav.bind(this);
        this.removeFav = this.removeFav.bind(this);
        this.getHistory = this.getHistory.bind(this);


        this.state = {
            login: true,
            signUp: false,
            rider: false,
            driver: false,
            profile: false,
            favPlaces : false ,
            admin: false,
            ridesHistory: false,
            role: 'rider',
            ride : [],
            profileInfo: {}
        };
    }
    getHistory()
    {
        const body = {
            email :this.state.profileInfo.email,
        };
        const url = 'http://localhost:3000/auth/history';
        fetch( url,
            { method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then((res)=> {
                res.json()
                    .then((resJson)=> {
                        this.setState({ride : resJson});
                        console.log (this.state.ride[0].rideremail);
                    });
            }).catch((er)=> console.log(er));
    }
    addFav(inputs)
    {
        const body = {
          email :this.state.profileInfo.email,
          fav :inputs[0].input
        };
        const url = 'http://localhost:3000/auth/favAdd';
        fetch( url,
            { method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then((res)=> {
                if (res.status === 200) {
                    console.log ("Fav Place Added");
                }
                else
                    console.log ("Error Adding Fav Place");
                });
    }
    removeFav(inputs)
    {
        const body = {
          email :this.state.profileInfo.email,
          fav :inputs[0].input,
        };
        const url = 'http://localhost:3000/auth/favRemove';
        fetch( url,
            { method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then((res)=> {
                if (res.status === 200) {
                    console.log ("Fav Place Removed");
                }
                else
                    console.log ("Error Removing Fav Place");
                });
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
                favPlaces : false ,
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
                favPlaces : false ,
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
                favPlaces : false ,
                ridesHistory: false
            });
    }

    onFavplacesClicked()
    {
        console.log ("Clicked On Fav Places");
        this.setState({
            login: false,
            signUp: false,
            rider: false,
            driver: false,
            admin: false,
            profile: false,
            favPlaces : true ,
            ridesHistory: false,

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
            favPlaces : false ,
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
            favPlaces : false ,
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
                            favPlaces : false ,
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
                            favPlaces : false ,
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
                            favPlaces : false ,
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
                            favPlaces : false ,
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
                            favPlaces : false ,
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
                            favPlaces : false ,
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
            favPlaces : false ,
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
            ridesHistory: false,
            favPlaces : false
        });
    }

    render() {
        let page;

        let cancelFee = 10;

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
                                    onMapClick={this.onMapClick}
                                    onFavplacesClicked = {this.onFavplacesClicked}
                        />
                    </div>
                    <Profile baseUrl={baseUrl} role={this.state.role} profile={this.state.profileInfo} redirectToMap={this.onMapClick}/>
                </div>;

        else if(this.state.ridesHistory) {
            this.getHistory();
            page =
                <div className="container-fluid">
                    <div className="row m-3">
                        <LeftDrawer className="col" onMyProfileClick={this.onRiderProfileClick}
                                    onMyRidesHistoryClick={this.onRiderRidesHistoryClick}
                                    onMapClick={this.onMapClick}
                                    onFavplacesClicked={this.onFavplacesClicked}
                        />
                    </div>
                    <RidesHistory className="clearfix" rides={this.state.ride}/>
                </div>;
        }
        else if (this.state.favPlaces)
        {
            console.log ("Processing Favs");
            {/* Add Fav Place*/}
            page =
                <div className="FavPage">
                <div className="container-fluid">
                    <div className="row m-3">
                        <LeftDrawer className="col" onMyProfileClick={this.onRiderProfileClick}
                                    onMyRidesHistoryClick={this.onRiderRidesHistoryClick}
                                    onMapClick={this.onMapClick}
                                    onFavplacesClicked = {this.onFavplacesClicked}
                        />
                    </div>
                    <div className="row m-5 "/>
                    <div className="row m-5"/>
                    <div className="row m-5"/>
                    <div className="row m-5"/>
                    <div className="row m-5"/>
                    <div className="row m-5"/>
                    <div className="row m-5">
                    <MyForm  heading="Add Favorite" formGroups={[
                        {id:"formBasicPlace", type: "place", placeHolder: "Enter Favorite Place"},]}
                            btnColor="primary"  btnTxt="Add"  onClickingbutton = {this.addFav}/>

                    <MyForm  heading="Remove Favorite" formGroups={[
                        {id:"formBasicPlace", type: "place", placeHolder: "Enter Favorite Place"},]}
                            btnColor="danger"  btnTxt="Remove"  onClickingbutton = {this.removeFav}/>
                    </div>
                </div>
                </div>

        }
        else if(this.state.rider) {
            page = <Rider riderProfile={this.state.profileInfo}
                          cancelFee={cancelFee}
                          leftDrawer={<LeftDrawer onMyProfileClick={this.onRiderProfileClick}
                                                  onMyRidesHistoryClick={this.onRiderRidesHistoryClick}
                                                  onMapClick={this.onMapClick}
                                                  onFavplacesClicked={this.onFavplacesClicked}
                          />}
            />;
        }
        else if(this.state.driver) {
            console.log ("Credit In App:" + this.state.profileInfo.credit);
            page =
                <div>
                    <Driver profile={this.state.profileInfo}/>
                    <div className="container-fluid fixed-top mt-3">
                        <div className="row">
                            <div className="col-1">
                                <LeftDrawer onMyProfileClick={this.onRiderProfileClick}
                                            onMyRidesHistoryClick={this.onRiderRidesHistoryClick}
                                            onMapClick={this.onMapClick}
                                            onFavplacesClicked={this.onFavplacesClicked}
                                />
                            </div>
                        </div>
                    </div>
                </div>;
        }
        else if(this.state.admin)
            page = <Admin profile={this.state.profileInfo} baseUrl={baseUrl}/>;

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