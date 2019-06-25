import React, {Component} from 'react';
import './App.css';
import {Driver} from './components/Driver';
import {GoogleApiWrapper} from "google-maps-react";

const apiKey = "AIzaSyADdCfBug07EnHeVDoRmQExesiwKbgCOC4";

class App extends Component{

    constructor(props) {
        super(props);

        this.state = {
        };
    }


    render() {
        let dName = "Hamada Sheraton";
        let dAge = 33;
        let dCredit = 50;

        return (
            <div className="App">
               <Driver name={dName} age={dAge} credit={dCredit} rideLocation = "Zamalek" rider = "Mazen" fare ="60" />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: apiKey
})(App);