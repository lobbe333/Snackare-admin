import React from 'react'

export default function InputPersonalInformation({newSpeakerData, handleChange, itemToEdit}) {
    return (
        <div className='input-personalInformation-container'>
            <h1>Lägg personlig information</h1>
            <input
                className='name-input'
                placeholder='Namn'
                name="name"
                value={itemToEdit?.name ?? newSpeakerData.name}
                onChange={handleChange}
            />
            <input
                className='email-input'
                type="email"
                placeholder='E-post'
                name="email"
                value={itemToEdit?.email ?? newSpeakerData.email}
                onChange={handleChange}
            />
            <input
                className='phoneNumber-input'
                placeholder='Telefonnummer'
                type="tel"
                name="phoneNumber"
                value={itemToEdit?.phoneNumber ?? newSpeakerData.phoneNumber}
                onChange={handleChange}
            />
        </div>
    )
}
