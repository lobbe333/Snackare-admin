import React from 'react'
import "../styles/UploadPopup.css"
import { useNavigate } from 'react-router-dom';

export default function UploadPopup({closeUploadPopup}) {
    const navigate = useNavigate();

    const handleOkClick = () => {
        closeUploadPopup()
        navigate('/speakers')
    }
    return (
        <div className="popup-container">
            <div className="popup-overlay" onClick={closeUploadPopup}></div>
            <div className="popup">
                Uppladdning av föreläsare lyckades!
                <button className="popup-ok-button" onClick={handleOkClick}>OK</button>
            </div>
        </div>
    )
}
