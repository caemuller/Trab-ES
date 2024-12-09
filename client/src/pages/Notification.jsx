import React, { useEffect } from 'react';
import '../assets/css/notification.css';

function Notification({ message, isVisible, onClose }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="notification">
            {message}
        </div>
    );
}

export default Notification;