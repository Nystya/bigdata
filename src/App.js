import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import Modal from 'react-modal';

import UserLocation from './components/UserLocation';
import IllegalParkingReports from './components/IllegalParkingReports';
import FreeParkingLots from './components/FreeParkingLots';

import Navbar from './components/Navbar';
import "./App.css";

import image_placeholder from './assets/placeholder.png';


Modal.setAppElement('#root');

const App = () => {    
    let [userModal, setUserModal] = useState(false);
    let [illegalModal, setIllegalModal] = useState(false);
    let [freeModal, setFreeModal] = useState(false);
    
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
            <MapContainer center={[44.45, 26.1]} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <UserLocation />
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
                <div className="modalDiv">
                    <h2 className="modalTitle">Welcome user!</h2>
                    <div className="buttonDiv">
                        <button>Logout</button>
                    </div>
                </div>
                
                <div className="buttonDiv closeButtonDiv">
                    <button onClick={() => setUserModal(false)}>Close</button>
                </div>
            </Modal>

            {/* ILLEGAL PARKING MODAL */}
            <Modal isOpen={illegalModal} onRequestClose={() => setIllegalModal(false)} style={modalStyle}>
                <div className="modalDiv">
                    <h2 className="modalTitle">Report illegal parking at current location</h2>
                                    
                    <div className="descriptionDiv">
                        <p>Description</p>
                        <textarea></textarea>
                    </div>                

                    <div className="pictureDiv">
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

                    <div className="buttonDiv">
                        <button>Send report</button>
                    </div>
                </div>

                <div className="buttonDiv closeButtonDiv">
                    <button onClick={() => setIllegalModal(false)}>Close</button>
                </div>
            </Modal>

            {/* FREE PARKING MODAL */}
            <Modal isOpen={freeModal} onRequestClose={() => setFreeModal(false)} style={modalStyle}>
                <div className="modalDiv">
                    <h2 className="modalTitle">Report free parking spot at current location</h2>
                    
                    <div className="descriptionDiv">
                        <p>Description</p>
                        <textarea></textarea>
                    </div>                


                    <div className="buttonDiv">
                        <button>Send report</button>
                    </div>
                </div>

                <div className="buttonDiv closeButtonDiv">
                    <button onClick={() => setFreeModal(false)}>Close</button>
                </div>
            </Modal>

        </div>
    );
}

export default App;