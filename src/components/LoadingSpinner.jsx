import React from 'react';
import '../styles/App.css'; 

const LoadingSpinner = ({ text = "Loading...", size = 'medium' }) => {
    const sizeClass = `spinner-${size}`;

    return (
        <div className={`loading-indicator ${sizeClass}`}> 
            <div className="spinner-graphic"></div> 
            <p className="loading-text">{text}</p>
        </div>
    );
};

export default LoadingSpinner;