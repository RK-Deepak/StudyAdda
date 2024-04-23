import React, { useState, useEffect } from 'react';
import logo from "../../../assets/Logo/studyadda-favicon-black.png"

function LogoStart() {
    const [enlarged, setEnlarged] = useState(false);

    useEffect(() => {
        // Set the logo to be enlarged after a delay (e.g., 1 second)
        const timer = setTimeout(() => {
            setEnlarged(true);
        }, 800); // Adjust the delay time as needed

        // Clear the timer on component unmount
        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    return (
        <div className={`logo-container ${enlarged ? 'enlarged' : ''} overflow-hidden`}>
            <img src={logo} alt="Logo" className="logo" />
        </div>
    );
}

export default LogoStart;
