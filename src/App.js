import React, {Component} from 'react';
import './App.css';
import {MapContainer} from "./Components/Map";
import {GoogleApiWrapper} from "google-maps-react";

const apiKey = "AIzaSyADdCfBug07EnHeVDoRmQExesiwKbgCOC4";

class App extends Component{

    constructor(props) {
        super(props);
        this.handleMarkerClick = this.handleMarkerClick.bind(this);

        this.state = {
        };
    }

    handleMarkerClick() {
    };


    render() {

        return (
            <div className="App">
                <MapContainer google={window.google}/>
            </div>
        );
    }
}

export default GoogleApiWrapper ({
    apiKey: apiKey
})(MapContainer);