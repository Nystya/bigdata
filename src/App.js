import React, { useState } from 'react';
import { MapContainer, TileLayer, MapConsumer, Marker, Popup } from 'react-leaflet'

// import { fetchParkingLots } from './api/fetchParkingLots';
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

    const [imageSource, setImageSource] = useState("");

    const reportIllegalParking = (event) => {
        console.log("Button clicked");
    }

    const handleImageUpload = (event) => {
        const target = event.target;
        
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0];
                const newUrl = URL.createObjectURL(file);
                setImageSource(newUrl);
            }
        }
    }
    
    return (
        <div className="main-container">
            <Navbar />
            <MapContainer center={[44.45, 26.1]} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapConsumer>
                    {(map) => {
                        map.locate({setView: true});
                        return null;
                    }}
                </MapConsumer>
                <Marker position={[44.45, 26.1]}>
                    <Popup>
                        This is a nice popup
                    </Popup>
                </Marker>
            </MapContainer>
            <div className="report-buttons">
                <button onClick={reportIllegalParking}>Report Illegal Parking</button>
                <button onClick={reportIllegalParking}>Report Free Parking</button>
            </div>
            <div className="report-buttons">
                <input  
                    accept="image/*" 
                    id="icon-button-file" 
                    type="file" 
                    capture="environment"
                    onChange={handleImageUpload}
                />
                {imageSource ? (<img width="100px" height="100px" src={imageSource} alt=""/>) : null}
            </div>
        </div>
    );
}

export default App;