import React from 'react';
import '../styles/EditConfirmationPopup.css';
import { useNavigate } from 'react-router-dom';

export default function EditConfirmationPopup({ closeEditPopup }) {
    const navigate = useNavigate();

    const handleOkClick = () => {
        closeEditPopup()
        navigate('/speakers')
    }

    return (
        <div className="edit-popup-container">
            <div className="edit-popup-overlay" onClick={closeEditPopup}></div>
            <div className="edit-popup">
                Ändringar har genomförts!
                <button className="edit-popup-ok-button" onClick={handleOkClick}>OK</button>
            </div>
        </div>
    );
}
