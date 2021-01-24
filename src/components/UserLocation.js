import React, { useState } from 'react';
import { Popup, useMapEvents } from 'react-leaflet';
import Marker from 'react-leaflet-enhanced-marker';

import userLocationMarker from './assets/user-location-marker.png';

class IconComponent extends React.Component {
    render() {
        return <img width="50px" height="50px" src={userLocationMarker} alt="User Location"/>
    }
}

const UserLocation = () => {
    const [location, setLocation] = useState({lat: 45.00, lng: 26.00});

    const map = useMapEvents({
        locationfound: (location) => {
            console.log("Location found: ", location);
            setLocation(map.getCenter());
        },
    });

    map.locate({setView: true, watch: true});
    
    return (
        <Marker 
            position={location} 
            icon={<IconComponent/>}>

            <Popup>
                This is a nice popup
            </Popup>
        </Marker>
    )
}

export default UserLocation;