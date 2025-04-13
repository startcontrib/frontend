import React from 'react';
import '../styles/App.css';

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className="error-message">
            <p><strong>Error:</strong> {message}</p>
        </div>
    );
};

export default ErrorMessage;