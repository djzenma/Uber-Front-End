import React, {Component} from 'react';
import { Map, Marker} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};

class MapContainer extends Component{

    constructor(props) {
        super(props);

        this.state = {
            selectedPlace: {
                name: 'hehe'
            },
            areas: [{ lat: 30.029778, lng: 31.446361, name: 'NewCairo'},
                { lat: 30.030910, lng: 31.453245, name: 'Zamalek'},]
        };
    }

    displayMarkers = () => {
        return this.state.areas.map((area, index) => {
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


export default MapContainer;