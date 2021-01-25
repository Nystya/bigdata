import React, { useEffect, useState } from 'react';
import { Popup, useMapEvents } from 'react-leaflet';
import Marker from 'react-leaflet-enhanced-marker';

import './styles/UserLocation.css';

import userLocationMarker from './assets/user-location-marker.png';

import baseURL from '../config/config';
import axios from 'axios';

const userLocationURL = baseURL + "/api/userlocation";

class IconComponent extends React.Component {
    render() {
        return <img width="50px" height="50px" src={userLocationMarker} alt="User Location"/>
    }
}

const UserLocation = (props) => {
    const [userLocation, setUserLocation] = useState({lat: 45.00, lng: 26.00});
    const [firstLoad, setFirstLoad] = useState(true);
    const [mayUpdate, setMayUpdate] = useState(true);
    const { lockView, setLockView, setParentUserLocation } = props

    const map = useMapEvents({
        locationfound: (location) => {
            setUserLocation(location.latlng);

            if (mayUpdate) {
                setParentUserLocation(location.latlng);
                axios.put(userLocationURL, 
                    {
                        latitude: location.latlng.lat,
                        longitude: location.latlng.lng
                    },
                    {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('Auth')
                        }
                    }
                )
                .then((res) => {
                    setMayUpdate(false);
                })
                .catch((err) => console.log('Error: ', err));
            } 
            
            if (firstLoad) {
                map.flyTo(location.latlng, 18);
                setFirstLoad(false);
            }
        },
    });
    
    map.locate({watch: true});
    useEffect(() => {
        const mayUpdateResetInterval = setTimeout(() => {
            setMayUpdate(true);
            
        }, 2000);

        return () => clearInterval(mayUpdateResetInterval);
    })

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