import React  from 'react';
import { Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Marker from 'react-leaflet-enhanced-marker';

import { fetchParkingLots } from '../api/fetchParkingLots';

import './styles/FreeParkingLots.css';

import parkingLotMarker from './assets/parking-lot-marker.png';

class IconComponent extends React.Component {
    render() {
        return <img width="30px" height="30px" src={parkingLotMarker} alt="User Location"/>
    }
}

class FreeParkingLots extends React.Component {
    state = {
        freeParkingLots: []
    }

    componentDidMount = () => {
        fetchParkingLots()
        .then((reports) => this.setState({freeParkingLots: reports}))
        .catch((err) => console.log(err));

        console.log(this.state.freeParkingLots);
    }    
    
    
    handleClusterClick = (cluster) => {
        console.log("Cluster Click", cluster,  cluster.layer.getAllChildMarkers());
    }

    handleTakeSpot = (event, id) => {
        console.log("Taking spot: ", id);
    }

    render() {
        return (
            <MarkerClusterGroup onClusterClick={this.handleClusterClick}>
                {this.state.freeParkingLots.map((report) => {
                    const lat = report.location.latitude;
                    const lng = report.location.longitude;

                    return (
                        <Marker key={report.id} icon={<IconComponent/>} position={{lat, lng}}>
                            <Popup>
                                <div className="popup-container">
                                    <button onClick={(event) => this.handleTakeSpot(event, report.id)}>Take spot</button>
                                </div>
                            </Popup>
                        </Marker>
                    )
                })}
            </MarkerClusterGroup>
        )
    }
}

export default FreeParkingLots;