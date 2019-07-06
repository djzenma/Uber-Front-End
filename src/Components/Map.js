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
                { lat: 30.061476, lng: 31.219669, name: 'Zamalek'},
                { lat: 30.021793, lng: 31.209220, name: 'Giza'},
                { lat: 30.041182, lng: 31.202354, name: 'Dokki'},
                { lat: 29.960735, lng: 31.286436, name: 'Maadi'},
                { lat: 29.933474, lng: 30.917235, name: 'Giza'},]
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
                     zoom={12}
                     style={mapStyles}
                     initialCenter={{ lat: 30.029625, lng: 31.309098}}
                >
                    {this.displayMarkers()}
                </Map>
            </div>
        );
    }
}


export default MapContainer;