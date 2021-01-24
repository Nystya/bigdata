import React from 'react';
import { MapContainer, TileLayer, MapConsumer, Marker, Popup } from 'react-leaflet'

// import { fetchParkingLots } from './api/fetchParkingLots';

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
    const reportIllegalParking = (event) => {
        console.log("Button clicked");
    }

    return (
        <div className="main-container">
            <div className="navbar">
                <input accept="image/*" id="icon-button-file" type="file" capture="environment"/>
            </div>
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
        </div>
    );
}

export default App;