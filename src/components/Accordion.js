import { React, useState } from 'react'
import '../styles/Accordion.css'

export default function Accordion({ newSpeakerData, itemToEdit }) {
    const [personalInfoOpen, setPersonalInfoOpen] = useState(false)
    const [cardInfoOpen, setCardInfoOpen] = useState(false)
    const [profileInfoOpen, setProfileInfoOpen] = useState(false)

    return (
        <div className='accordion'>
            <div className='accordion-header' onClick={() => setPersonalInfoOpen(!personalInfoOpen)}>

                <h3>Personuppgifter</h3>
                <h3>{personalInfoOpen ? '-' : '+'}</h3>
            </div>
            {personalInfoOpen &&
                <>
                    <p>Namn: {itemToEdit ? itemToEdit.name : newSpeakerData.name}</p>
                    <p>Telefonnummer: {itemToEdit ? itemToEdit.phoneNumber : newSpeakerData.phoneNumber}</p>
                    <p>Email: {itemToEdit ? itemToEdit.email : newSpeakerData.email}</p>
                </>
            }

            <div className='accordion-header' onClick={() => setCardInfoOpen(!cardInfoOpen)}>
                <h3>Kortvysinformation</h3>
                <h3>{cardInfoOpen ? '-' : '+'}</h3>
            </div>
            {cardInfoOpen &&
                <>
                    <ui>
                        <p>Ämnen:</p>
                        {(itemToEdit ? itemToEdit.topics : newSpeakerData.topics).map((topic, index) => (
                            <li key={index}>{topic}</li>
                        ))}
                    </ui>
                    <p>Kort beskrivning: {itemToEdit ? itemToEdit.shortDescription : newSpeakerData.shortDescription}</p>
                    <p>Bild till kort: </p>
                    <img className='card-image' src={itemToEdit ? itemToEdit.imgUrl : newSpeakerData.imgUrl} />

                </>
            }

            <div className='accordion-header' onClick={() => setProfileInfoOpen(!profileInfoOpen)}>
                <h3>Profilsidans innehåll</h3>
                <h3>{profileInfoOpen ? '-' : '+'}</h3>
            </div>
            {profileInfoOpen &&
                <>
                    <p>Rubrik till profilsidan: {itemToEdit ? itemToEdit.header : newSpeakerData.header}</p>
                    <p>Url till bild 2: {itemToEdit ? itemToEdit.imgUrl2 : newSpeakerData.imgUrl2}</p>
                    <p>Lång beskrivning: {itemToEdit ? itemToEdit.longDescription : newSpeakerData.longDescription}</p>
                    <ui>
                        <p>Exempelföreläsningar:</p>
                        {(itemToEdit ? itemToEdit.exampleLectures : newSpeakerData.exampleLectures).map((exampleLecture, index) => (
                            <li key={index}>{exampleLecture}</li>
                        ))}
                    </ui>
                    <ui>
                        <p>Recensioner:</p>
                        {(itemToEdit ? itemToEdit.reviews : newSpeakerData.reviews).map((review, index) => (
                            <li key={index}>{review}</li>
                        ))}
                    </ui>
                </>
            }
        </div>
    )
}
