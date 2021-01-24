import React from 'react';
import { Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { fetchIllegalParking} from '../api/fetchIllegalParking';

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
                        <Marker key={idx} position={{lat, lng}}>
                            
                        </Marker>
                    )
                })}
            </MarkerClusterGroup>
        )
    }
}

export default IllegalParkingReports;