import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import Modal from 'react-modal';
import { Redirect } from "react-router";
import axios from 'axios';

import UserLocation from '../UserLocation';
import IllegalParkingReports from '../IllegalParkingReports';
import FreeParkingLots from '../FreeParkingLots';

import Navbar from '../Navbar';
import "./home.css";

import image_placeholder from './assets/placeholder.png';
import current_location from './assets/current_location.png';


Modal.setAppElement('#root');

const Home = () => {

    // show modals
    const [userModal, setUserModal] = useState(false);
    const [illegalModal, setIllegalModal] = useState(false);
    const [freeModal, setFreeModal] = useState(false);

    // center on user's current position
    const [lockView, setLockView] = useState(false);

    // wether the user is logging out
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    
    // set image proof src
    const [illegalProofSource, setIllegalProofSource] = useState("");
    const handleIllegalProof = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0];
                const newUrl = URL.createObjectURL(file);
                setIllegalProofSource(newUrl);
            }
        }
    }
        
    // message to backend
    const [currentLocation, setCurrentLocation] = useState(null);
    const [timestamp, setTimestamp] = useState(null);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const handleSubmitReport = (recivedType) => {
        const timpestamp = Date.now();
        
        let description;
        if (recivedType === 'illegal') {
            description = document.getElementById("illegal-description").value
        } else {
            descriprion = document.getElementById("free-description").value
        }

        const payload = {
            'timestamp': Date.now().,
            'location': currentLocation,
            'type': recivedType,
            'description': description,
            'base64EncodedPhoto': '',
            'tag': ''
        }

        axios.post('http://localhost:9090/register', user)
        .then(res => {
            console.log(res.data);
        })
        
        console.log('currentLocation', currentLocation)
        console.log('timestamp', Date.now())
        console.log('type', recivedType)
        console.log('description', description)
        console.log('illegalProofSource', illegalProofSource)
        console.log('photo', photo)
    }

    const modalStyle = {
        overlay: {
            display: 'flex',
            alignItems: 'center'
        },
        content: {
            height: `fit-content`,
            width: '80%',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    return (
        <div className="main-container">
            <img
                className="current-location-button"
                src={current_location}
                alt="center"
                onClick={() => setLockView(true)}
            ></img>

            <MapContainer center={[44.45, 26.1]} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <UserLocation lockView={lockView} setLockView={setLockView} updateLocation={setCurrentLocation}/>
                <IllegalParkingReports />
                <FreeParkingLots />
            </MapContainer>
            
            <Navbar
                user={setUserModal}
                illegal={setIllegalModal}
                proof={setIllegalProofSource}
                free={setFreeModal}
            />

            {/* USER MODAL */}
            <Modal isOpen={userModal} onRequestClose={() => setUserModal(false)} style={modalStyle}>
                <div className="modal-div">
                    <h2 className="modal-title">Welcome user!</h2>
                    <div className="button-div">
                        <button onClick={() => setIsLoggingOut(true)}>Logout</button>
                    </div>
                </div>
                
                <div className="button-div close-button-div">
                    <button onClick={() => setUserModal(false)}>Close</button>
                </div>
            </Modal>

            {/* ILLEGAL PARKING MODAL */}
            <Modal isOpen={illegalModal} onRequestClose={() => setIllegalModal(false)} style={modalStyle}>
                <div className="modal-div">
                    <h2 className="modal-title">Report illegal parking at current location</h2>
                                    
                    <div className="description-div">
                        <p>Description</p>
                        <textarea id="illegal-description"></textarea>
                    </div>                

                    <div className="picture-div">
                        <p>Take a picture</p>
                        {illegalProofSource ? 
                            <img src={illegalProofSource} alt="snap"></img>
                            :
                            <img src={image_placeholder} alt="snap"></img>
                        }
                        <input
                            accept='image/*'
                            type='file'
                            capture='environment'
                            onChange={(e) => handleIllegalProof(e.target)}
                        />
                    </div>

                    <div className="button-div">
                        <button
                            onClick={ () => {
                                handleSubmitReport('illegal')
                            }}
                        >Send report</button>
                    </div>
                </div>

                <div className="button-div close-button-div">
                    <button onClick={() => setIllegalModal(false)}>Close</button>
                </div>
            </Modal>

            {/* FREE PARKING MODAL */}
            <Modal isOpen={freeModal} onRequestClose={() => setFreeModal(false)} style={modalStyle}>
                <div className="modal-div">
                    <h2 className="modal-title">Report free parking spot at current location</h2>
                    
                    <div className="description-div">
                        <p>Description</p>
                        <textarea id="free-description"></textarea>
                    </div>                


                    <div className="button-div">
                        <button
                            onClick={ () => {
                                setDescription( document.getElementById("free-description").value );
                                handleSubmitReport('free');
                            }}
                        >Send report</button>
                    </div>
                </div>

                <div className="button-div close-button-div">
                    <button onClick={() => setFreeModal(false)}>Close</button>
                </div>
            </Modal>

            { isLoggingOut && <Redirect to="/" /> }

        </div>
    );
}

export default Home;