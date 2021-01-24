import React from 'react';
import userLogo from './assets/user-logo.png';
import illegalParkingLogo from './assets/illegal-parking-logo.png';
import freeParkingLogo from './assets/parking-lot-logo.png';

import './styles/Navbar.css';


const Navbar = (props) => {
    const handleUserMenu = () => {
        console.log("Showing user menu modal");
        props.user(true);
    }

    const handleIllegalMenu = () => {
        console.log("Showing illegal parking report modal");
        props.illegal(true);
        props.proof('');
    }

    const handleParkingMenu = () => {
        console.log("Showing free parking report modal");
        props.free(true);
    }
    
    return (
        <div className="nav-container">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <nav>
                <img src={userLogo} alt="user logo" onClick={handleUserMenu}/>
                <img src={illegalParkingLogo} alt="illegal parking logo" onClick={handleIllegalMenu}/>
                <img src={freeParkingLogo} alt="free parking logo" onClick={handleParkingMenu}/>
            </nav>
        </div> 
    )
}

export default Navbar;
