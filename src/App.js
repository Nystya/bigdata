import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'

import UserLocation from './components/UserLocation';
import IllegalParkingReports from './components/IllegalParkingReports';
import FreeParkingLots from './components/FreeParkingLots';

import Navbar from './components/Navbar';

import "./App.css";

const App = () => {
    return (
        <div className="main-container">
            <MapContainer center={[44.45, 26.1]} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <UserLocation />
                <IllegalParkingReports />
                <FreeParkingLots />
            </MapContainer>
            <Navbar />         
        </div>
    );
}

export default App;