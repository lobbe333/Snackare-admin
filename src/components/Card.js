import React from 'react'
import '../styles/Card.css'
import { Link, useNavigate } from "react-router-dom";


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

export default function Card({ speaker, handleDelete, handleEdit }) {
  const navigate = useNavigate();

  const rolesElements = Object.entries(speaker.roles).filter(([role, isChecked]) => isChecked).map(([role]) => (
    <div className='role' key={role}>{translateRole(role)}</div>
  ))

  const topicElements = speaker.topics.map((topic, index) => (
    <div className='topic' key={index}>{topic}</div>
  ))

  return (
    <div>
      <div className='card'>
        <div className='card-front'>
          <div className='card-information'>
            <img src={speaker.imgUrl} className='card-image' alt={speaker.name} />
            <h2 className='name'>{speaker.name}</h2>
            <div className='roles-container'>{rolesElements}</div>
          </div>
        </div>
        <div className='card-back' style={{ backgroundImage: `url(${speaker.imgUrl})` }}>
          <div className='card-information'>
            <p className="delete-icon" onClick={(event) => handleDelete(event, speaker.id)}>Ta bort</p>
            <p className="edit-icon" onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleEdit(speaker)
              navigate('/edit-speaker')
            }}>Redigera</p>
            <h2>{speaker.name}</h2>
            <p>{speaker.shortDescription}</p>
            <div className='topics-container'>
              {topicElements}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
