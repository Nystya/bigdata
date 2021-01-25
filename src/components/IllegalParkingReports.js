import React from 'react';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Marker from 'react-leaflet-enhanced-marker';

import { fetchIllegalParking} from '../api/fetchIllegalParking';

import illegalParkingMarker from './assets/illegal-parking-marker.png'


class IconComponent extends React.Component {
    render() {
        return <img width="30px" height="30px" src={illegalParkingMarker} alt="User Location"/>
    }
}

class IllegalParkingReports extends React.Component  {
    state = {
        illegalParkingReports: []
    }
    
    componentDidMount = () => {
        fetchIllegalParking()
        .then((reports) => this.setState({illegalParkingReports: reports}))
        .catch((err) => console.log(err));
    
        console.log(this.state.illegalParkingReports);
    }

    handleClusterClick = (cluster) => {
        console.log("Cluster Click", cluster,  cluster.layer.getAllChildMarkers());
    }

    render() {
        return (
            <MarkerClusterGroup onClusterClick={this.handleClusterClick}>
                {this.state.illegalParkingReports.map((report, idx) => {
                    const lat = report.location.latitude;
                    const lng = report.location.longitude;
    
                    return (
                        <Marker key={idx} position={{lat, lng}} icon={<IconComponent/>}>
                            
                        </Marker>
                    )
                })}
            </MarkerClusterGroup>
        )
    }
}

export default IllegalParkingReports;