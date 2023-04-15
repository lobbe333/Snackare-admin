import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs, addDoc, deleteDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Card from './Card';

import "../styles/Card.css"

export default function Speakers({ setIsEditing, setItemToEdit }) {
    const [speakers, setSpeakers] = useState([])




    const speakersCollectionRef = collection(db, "speakers")

    const location = useLocation()
    useEffect(() => {
        const getSpeakers = async () => {

            try {
                const data = await getDocs(speakersCollectionRef)
                const filteredData = data.docs.map(doc => (
                    {
                        ...doc.data(),
                        id: doc.id
                    }
                ))
                setSpeakers(filteredData)
            } catch (err) {
                console.error(err)
            }
        }

        getSpeakers()
    }, [location])

    const handleDelete = async (event, speakerId) => {
        event.stopPropagation()
        event.preventDefault()
        try {
            const speakerDoc = doc(db, "speakers", speakerId)
            await deleteDoc(speakerDoc)
            setSpeakers(speakers.filter((speaker) => speaker.id !== speakerId))
        } catch (err) {
            console.error(err)
        }
    }


    function handleEdit(speaker) {
        setItemToEdit(speaker)
        setIsEditing(true)
    }

    const cardElements = speakers.map(speaker => (
        <div key={speaker.id}>
            <Link to={`/speaker/${speaker.id}`}>
                <Card
                    speaker={speaker}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            </Link>
        </div>
    ));

    return (
        <div className='card-section'>
            {cardElements}
        </div>
    )
}
