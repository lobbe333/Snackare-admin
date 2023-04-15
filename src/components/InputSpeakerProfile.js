import React from 'react'
import '../styles/Input.css'

export default function InputSpeakerProfile({ itemToEdit, newSpeakerData, handleChange, handleSubmit, currentLecture, setCurrentLecture, currentReview, setCurrentReview, handleAddLecture, handleAddReview, handleRemoveLecture, handleRemoveReview }) {
    return (
        <div>
            <div className='input-container-speakerProfile'>
                <h1>Lägg till inormation till profilsidan</h1>
                <input
                    className='header-input'
                    placeholder='Rubrik'
                    name="header"
                    value={itemToEdit?.header ?? newSpeakerData.header}
                    onChange={handleChange}
                />
                <input
                    className='imgUrl2-input'
                    placeholder='Url 2 till bild'
                    name="imgUrl2"
                    value={itemToEdit?.imgUrl2 ?? newSpeakerData.imgUrl2}
                    onChange={handleChange}
                />
                <textarea
                    className='long-description-input'
                    placeholder='Text till sida'
                    name="longDescription"
                    value={itemToEdit?.longDescription.replace(/<br\s*\/?>/g, '\n') ?? newSpeakerData.longDescription}
                    onChange={handleChange}
                />
                <div className='example-lectures-input-wrapper'>
                    <input
                        className='example-lectures-input'
                        placeholder='Ny föreläsning'
                        name='exampleLectures'
                        value={itemToEdit ? itemToEdit.exampleLecture : newSpeakerData.exampleLecture}
                        onChange={handleChange}
                    />
                    <button className='button-add-exampleLecture' onClick={() => handleAddLecture()}>Lägg till föreläsning</button>
                </div>
                <div className='example-lectures-list'>
                    <ul>
                        <h3>Exempelföreläsningar</h3>
                        {(itemToEdit ? itemToEdit.exampleLectures : newSpeakerData.exampleLectures).map((exampleLecture, index) => (
                            <div key={index} className='example-lecture'>
                                <li>{exampleLecture}</li>
                                <p onClick={() => handleRemoveLecture(index)}>Ta bort</p>
                            </div>
                        ))}
                    </ul>

                </div>

                <div className='reviews-input-wrapper'>
                    <input
                        className='reviews-input'
                        placeholder='Ny recension'
                        name='reviews'
                        value={newSpeakerData.review}
                        onChange={handleChange}
                    />
                    <button className='button-add-review' onClick={() => handleAddReview()}>Lägg till recension</button>
                </div>
                <div className='reviews-list'>
                    <ul>
                        <h3>Recensioner</h3>
                        {(itemToEdit ? itemToEdit.reviews : newSpeakerData.reviews).map((review, index) => (
                            <div key={index} className='review'>
                                <li>{review}</li>
                                <p onClick={() => handleRemoveReview(index)}>Ta bort</p>
                            </div>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}
