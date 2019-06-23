import React, {Component} from 'react';
import './App.css';

import {Rider} from './Components/Rider';
import {GoogleApiWrapper} from "google-maps-react";

const apiKey = "AIzaSyADdCfBug07EnHeVDoRmQExesiwKbgCOC4";

class App extends Component{

    constructor(props) {
        super(props);

        this.state = {
        };
    }


    render() {
        let riderProfile = {
            name: "Bassant",
            age: 20,
            credit: 17
        };
        let cancelFee = 10;

        return (
            <div className="App">
                <Rider riderProfile={riderProfile} cancelFee={cancelFee}/>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: apiKey
})(App);