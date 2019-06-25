import React, {Component} from 'react';
import { Map, Marker} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};

export class MapContainer extends Component{

    constructor(props) {
        super(props);

        this.state = {
            selectedPlace: {
                name: 'hehe'
            },
            areas: [{ lat: 30.0074, lng: 31.4913}, //New Cairo
                { lat: 29.928, lng: 30.9188}, // 6th of October
                { lat: 30.0131, lng: 31.2089},//Giza
                { lat: 30.0566, lng: 31.3301}] //Nasr City
        };
    }

    displayMarkers = () => {
        return this.state.areas.map((area, index) => {
            console.log(index);
            return <Marker key={index} id={index} position={{ lat: area.lat, lng: area.lng
            }}
               onClick={() => this.props.onMarkerClicked(area)} />
        });
    };

    render() {

        return (
            <div>
                <Map google={this.props.google}
                     zoom={14}
                     style={mapStyles}
                     initialCenter={{ lat: 30.029778, lng: 31.446361}}
                >
                    {this.displayMarkers()}
                </Map>
            </div>
        );
    }
}