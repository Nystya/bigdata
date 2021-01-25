import React, { useEffect, useState } from 'react';
import { Popup, useMapEvents } from 'react-leaflet';
import Marker from 'react-leaflet-enhanced-marker';

import userLocationMarker from './assets/user-location-marker.png';

class IconComponent extends React.Component {
    render() {
        return <img width="50px" height="50px" src={userLocationMarker} alt="User Location"/>
    }
}

const UserLocation = (props) => {
    const [userLocation, setUserLocation] = useState({lat: 45.00, lng: 26.00});
    const [firstLoad, setFirstLoad] = useState(true);
    const { lockView, setLockView, updateLocation } = props

    const map = useMapEvents({
        locationfound: (location) => {
            setUserLocation(location.latlng);
            updateLocation(location.latlng);
            if (firstLoad) {
                map.flyTo(location.latlng, 18);
                setFirstLoad(false);
            }
        },
    });

    map.locate({watch: true});

    useEffect(() => {
        if (lockView) {
            map.flyTo(userLocation, 18);
            setLockView(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lockView, setLockView])
    return (
        <Marker 
            position={userLocation} 
            icon={<IconComponent/>}>

            <Popup>
                This is a nice popup
            </Popup>
        </Marker>
    )
}

export default UserLocation;