import React from 'react'
import '../styles/Input.css'

function translateRole(role) {
    switch (role) {
        case 'entertainer':
            return 'Underhållare';
        case 'moderator':
            return 'Moderator';
        case 'lecturer':
            return 'Föreläsare';
        default:
            return role;
    }
}

export default function OutputCard({ newSpeakerData, itemToEdit }) {

    const rolesElements = Object.entries(itemToEdit ? itemToEdit.roles : newSpeakerData.roles).filter(([role, isChecked]) => isChecked).map(([role]) => (
        <div className='role'>{translateRole(role)}</div>
    ))

    const topicElements = (itemToEdit ? itemToEdit.topics : newSpeakerData.topics).map(topic => (
            <div className='topic'>{topic}</div>
    ))

    return (
        <div>
            <div className='card'>
                <div className='card-front'>
                    <div className='card-information'>
                        <img src={itemToEdit?.imgUrl ?? newSpeakerData.imgUrl} className='card-image' alt={itemToEdit?.name ?? newSpeakerData.name} />
                        <h2 className='name'>{itemToEdit?.name ?? newSpeakerData.name}</h2>
                        <div className='roles-container'>{rolesElements}</div>
                    </div>
                </div>
                <div className='card-back' style={{ backgroundImage: `url(${itemToEdit?.imgUrl ?? newSpeakerData.imgUrl})` }}>
                    <div className='card-information'>
                        <h2>{itemToEdit?.name ?? newSpeakerData.name}</h2>
                        <p>{itemToEdit?.shortDescription ?? newSpeakerData.shortDescription}</p>
                        <div className='topics-container'>
                            {topicElements}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
