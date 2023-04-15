import React from 'react';
import "../styles/ErrorPopup.css"

export default function ErrorPopup({ errors, closeErrorPopup }) {
  const errorList = errors.map((error, index) => (
    <li key={index}>{error}</li>
  ));

  console.log(errorList)
  return (
    <div className="error-popup">
      <h2>Error</h2>
      <ul>{errorList}</ul>
      <button className='error-popup__button' onClick={closeErrorPopup}>OK</button>
    </div>
  );
}

