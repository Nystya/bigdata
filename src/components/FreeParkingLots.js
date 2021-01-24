import React  from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { fetchParkingLots } from '../api/fetchParkingLots';

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
                        <Marker key={report.id} position={{lat, lng}}>
                            <Popup>
                                <div>
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