import React, { useState } from 'react';

import './styles/Navbar.css';

const Navbar = () => {
    const [responsive, setResponsive] = useState('');
    
    const handleMenuToggle = (event) => {
        if (responsive === '') {
            setResponsive('responsive');
        } else {
            setResponsive('');
        }
    }

    return (
        <div className="nav-container">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <nav className={responsive}>
                <button className="icon" onClick={handleMenuToggle}>
                    <i class="fa fa-bars"></i>
                </button>
            </nav>
        </div> 
    )
}

export default Navbar;
