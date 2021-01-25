import firebase from '../../api/firebase';

import React, { useEffect, useState } from 'react';
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

import baseURL from '../../config/config';
const illegalParkingURL = baseURL + "/api/illegalparkingevent";
const freeParkingURL = baseURL + "/api/parkinglots";

const deviceTokenURL = baseURL + "/api/devicetoken"

Modal.setAppElement('#root');

const Home = () => {

    // show modals
    const [userModal, setUserModal] = useState(false);
    const [illegalModal, setIllegalModal] = useState(false);
    const [freeModal, setFreeModal] = useState(false);

    // center on user's current position
    const [parentUserLocation, setParentUserLocation] = useState({});
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

    // report message to backend
    const handleSubmitReport = (type) => {
        let payload;
        let endpoint;
        
        if (type === 'illegal') {
            endpoint = illegalParkingURL;
            payload = {
                'timestamp': Date.now(),
                'location': parentUserLocation,
                'type': type,
                'description': document.getElementById("illegal-description").value,
                'base64EncodedPhoto': '',
                'tag': ''
            }
            setIllegalModal(false);
        } else {
            endpoint = freeParkingURL;
            payload = {
                'timestamp': Date.now(),
                'location': parentUserLocation,
                'isFree': type,
            }
            setFreeModal(false);
        }

        axios.post(endpoint, payload);
        

    }
    
    // Enable push notifications
    useEffect(() => {
        const messaging = firebase.messaging();
        messaging.requestPermission().then(() => {
            return messaging.getToken();
        })
        .then((token) => {
            axios.put(deviceTokenURL, {deviceToken: token}, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('Auth')
                }
            })
            .then((res) => console.log("Success"))
            .catch((err) => console.log("Error sending token: ", err));
        })
        .catch((err) => console.log("Error: ", err))

        messaging.onMessage((payload) => {
            console.log('Message received. ', payload);
        });
    })


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
                <UserLocation 
                    lockView={lockView}
                    setLockView={setLockView}
                    setParentUserLocation={setParentUserLocation}
                />
                <IllegalParkingReports
                    latitude={44.45}
                    longitude={26.1}
                    radius={100}
                ></IllegalParkingReports>
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
