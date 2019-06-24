import React, {Component} from 'react';
import './App.css';

import {Rider} from './Components/Rider';
import Profile from './Components/Profile';
import {GoogleApiWrapper} from "google-maps-react";

const apiKey = "AIzaSyADdCfBug07EnHeVDoRmQExesiwKbgCOC4";

class App extends Component{

    constructor(props) {
        super(props);

        this.onRiderProfileClick = this.onRiderProfileClick.bind(this);

        this.state = {
            profile: false
        };
    }

    onRiderProfileClick() {
        this.setState({profile: true});
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

        if(this.state.profile)
            page = <Profile profile={riderProfile}/>;
        else
            page = <Rider riderProfile={riderProfile} cancelFee={cancelFee} onRiderProfileClick={this.onRiderProfileClick}/>;

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