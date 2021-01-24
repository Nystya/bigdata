import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

// import { fetchParkingLots } from './api/fetchParkingLots';
// import { fetchIllegalParking} from './api/fetchIllegalParking';

import Navbar from './components/Navbar';

import "./App.css";

const App = () => {
    // const [query, setQuery] = useState('');
    // const [parkingLots, setParkingLots] = useState({}); 

    // const search = async (e) => {
    //     if (e.key === 'Enter') {
    //         const data = await fetchParkingLots(query);

    //         setParkingLots(data);
    //         setQuery('');
    //     }
    // }

    // const [imageSource, setImageSource] = useState("");

    // const handleImageUpload = (event) => {
    //     const target = event.target;
        
    //     if (target.files) {
    //         if (target.files.length !== 0) {
    //             const file = target.files[0];
    //             const newUrl = URL.createObjectURL(file);
    //             setImageSource(newUrl);
    //         }
    //     }
    // }

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
            <Marker position={location}>
                <Popup>
                    This is a nice popup
                </Popup>
            </Marker>
        )
    }
    
    return (
        <div className="main-container">
            <MapContainer center={[44.45, 26.1]} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <UserLocation />
            </MapContainer>
            <Navbar />         
        </div>
    );
}

export default App;