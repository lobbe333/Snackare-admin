import React from 'react'
import '../styles/SpeakerProfile.css'
import { useParams } from 'react-router-dom'

export default function SpeakerProfile({ speakers }) {
  const { id } = useParams()
  const speaker = speakers.find(speaker => speaker.id === id)

  const exampleLecturesElements = speaker.exampleLectures.map(exampleLecture => (
    <li><a>{exampleLecture}</a></li>
  ))

  return (
    <div className='speakerProfile'>
      <div className='speakerProfile-image-name'>
        <div className='speakerProfile-name-container'>
          <h1>{speaker.name}</h1>
        </div>
        <div className='speakerProfile-image-container'>
          <img src={speaker.imgUrl} alt={speaker.name} className='speakerProfile-image' />
        </div>
      </div>
      <div className='speakerProfile-header-text'>
        <div className='speakerProfile-header-container'>
          <h1>{speaker.header}</h1>
        </div>
        <div className='speakerProfile-text-container'>
          <p dangerouslySetInnerHTML={{ __html: speaker.longDescription }}></p>
        </div>
        <div className='speakerProfile-header-container'>
          <h1>Exempelföreläsningar</h1>
        </div>
        <div className='speakerProfile-header-container'>
          {exampleLecturesElements}
        </div>
      </div>
    </div>
  )
}
