import React, {Component} from 'react';
import './App.css';

import {Rider} from './components/Rider';
import {GoogleApiWrapper} from "google-maps-react";

const apiKey = "AIzaSyADdCfBug07EnHeVDoRmQExesiwKbgCOC4";

class App extends Component{

    constructor(props) {
        super(props);

        this.state = {
        };
    }


    render() {
        let name = "Bassant";
        let age = 20;
        let credit = 17;

        return (
            <div className="App">
                <Rider name={name} age={age} credit={credit}/>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: apiKey
})(App);