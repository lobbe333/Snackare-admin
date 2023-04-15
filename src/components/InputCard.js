import { React, useEffect} from 'react'
import '../styles/Input.css'

export default function InputCard({ newSpeakerData, handleChange, handleAddTopic, handleRemoveTopic, currentTopic, itemToEdit }) {
    useEffect(() => {
        console.log('newSpeakerData updated:', newSpeakerData);
      }, [newSpeakerData]);
      
    
    return (
        <div>
            <div className='input-container'>
                <h1>Lägg till information till kortet</h1>
                <input
                    className='imgUrl-input'
                    placeholder='Url till bild'
                    name="imgUrl"
                    value={itemToEdit?.imgUrl ?? newSpeakerData.imgUrl}
                    onChange={handleChange}
                />
                <div className='roles-input'>
                    <label>
                        <input
                            type="checkbox"
                            name="entertainer"
                            checked={itemToEdit?.roles.entertainer ?? newSpeakerData.roles.entertainer}
                            onChange={handleChange}
                        />
                        Underhållare
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="moderator"
                            checked={itemToEdit?.roles.moderator ?? newSpeakerData.roles.moderator}
                            onChange={handleChange}
                        />
                        Moderator
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="lecturer"
                            checked={itemToEdit?.roles.lecturer ?? newSpeakerData.roles.lecturer}
                            onChange={handleChange}
                        />
                        Föreläsare
                    </label>
                </div>
                <textarea
                    className='shortDescription-textarea'
                    placeholder='Kort beskrivning'
                    name="shortDescription"
                    value={itemToEdit?.shortDescription ?? newSpeakerData.shortDescription}
                    onChange={handleChange}
                />
                <div className='topics-input-wrapper'>
                    <input
                        className='topics-input'
                        placeholder='Ämne'
                        name="topics"
                        value={currentTopic}
                        onChange={handleChange}
                    />
                    <button className='button-add-topic' onClick={() => handleAddTopic()}>Lägg till ämne</button>
                </div>
                <div className='topic-list'>
                    <ul>
                        <h3>Ämnen</h3>
                        {(itemToEdit ? itemToEdit.topics : newSpeakerData.topics).map((topic, index) => (
                            <div key={index} className='input-topic'>
                                <li>{topic}</li>
                                <p onClick={() => handleRemoveTopic(index)}>Ta bort</p>
                            </div>
                        ))}
                    </ul>
                </div>        
            </div>
        </div>
    )
}
