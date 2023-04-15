import { useEffect, useState } from 'react';
import './App.css';
import { db } from './config/firebase'
import { getDocs, collection, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'
import InputCard from './components/InputCard';
import OutputCard from './components/OutputCard';
import InputSpeakerProfile from './components/InputSpeakerProfile'
import Navbar from './components/Navbar';
import Accordion from './components/Accordion'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import InputPersonalInformation from './components/InputPersonalInformation';
import ProgressBar from './components/ProgressBar';
import UploadPopup from './components/UploadPopup';
import ErrorPopup from './components/ErrorPopup';
import { validateEmail, validatePhoneNumber, validateName, validateImgUrl, validateShortDescription, validateTopics, validateHeader, validateLongDescription, validateReviews, validateExampleLectures } from './Utils/validationUtils';
import EditConfirmationPopup from './components/EditConfirmationPopup';
import Speakers from './components/Speakers';
import SpeakerProfile from './components/SpeakerProfile';

function App() {

  const [currentStep, setCurrentStep] = useState(0)
  const [currentLecture, setCurrentLecture] = useState("")
  const [currentReview, setCurrentReview] = useState("")
  const [currentTopic, setCurrentTopic] = useState("")
  const [showUploadPopup, setShowUploadPopup] = useState(false)
  const [errors, setErrors] = useState([])
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [itemToEdit, setItemToEdit] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [speakers, setSpeakers] = useState([])

  const goForward = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  const goBackwards = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  const onStepClick = (stepNumber) => {
    setCurrentStep(stepNumber)
  }

  const [newSpeakerData, setNewSpeakerData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    shortDescription: "",
    roles: {
      entertainer: false,
      moderator: false,
      lecturer: false
    },
    topics: [],
    imgUrl: "",
    imgUrl2: "",
    header: "",
    longDescription: "",
    exampleLectures: [],
    reviews: []
  })

  const speakersCollectionRef = collection(db, "speakers")

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
}, [])

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    if (itemToEdit) {
      const itemToEditCopy = { ...itemToEdit };
      if (type === "checkbox") {
        itemToEditCopy.roles[name] = checked;
      } else if (name === "topics") {
        setCurrentTopic(value);
      } else if (name === "exampleLectures") {
        setCurrentLecture(value);
      } else if (name === "reviews") {
        setCurrentReview(value);
      } else {
        itemToEditCopy[name] = value;
      }
      setItemToEdit(itemToEditCopy);
    } else {
      const newData = { ...newSpeakerData };
      const roles = { ...newData.roles };

      if (type === "checkbox") {
        roles[name] = checked;
      } else if (name === "topics") {
        setCurrentTopic(value);
      } else if (name === "exampleLectures") {
        setCurrentLecture(value);
      } else if (name === "reviews") {
        setCurrentReview(value);
      } else {
        newData[name] = value;
      }

      setNewSpeakerData({ ...newData, roles });
    }
  }



  const handleSubmit = async () => {
    try {
      if (!validateInput()) {
        setShowErrorPopup(true)
      } else {
        if (isEditing) {
          await setDoc(doc(speakersCollectionRef, itemToEdit.id), {
            ...itemToEdit,
            longDescription: itemToEdit.longDescription.replace(/\n/g, "<br/>")
          })
          setShowEditPopup(true)
          console.log(showEditPopup)
        } else {
          await addDoc(speakersCollectionRef, {
            ...newSpeakerData,
            longDescription: newSpeakerData.longDescription.replace(/\n/g, "<br/>")
          })
          setNewSpeakerData({
            name: "",
            email: "",
            phoneNumber: "",
            shortDescription: "",
            roles: {
              entertainer: false,
              moderator: false,
              lecturer: false
            },
            topics: [],
            imgUrl: "",
            imgUrl2: "",
            header: "",
            longDescription: "",
            exampleLectures: [],
            reviews: []
          })
          console.log(newSpeakerData)
          displayUploadPopup()
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddLecture = () => {
    if (isEditing) {
      if (currentLecture.trim()) {
        setItemToEdit((prevItemToEdit => {
          return {
            ...prevItemToEdit,
            exampleLectures: [
              ...prevItemToEdit.exampleLectures,
              currentLecture.trim()
            ]
          }
        }))
        setCurrentLecture('')
        console.log(newSpeakerData.exampleLectures)
      }
    } else {
      if (currentLecture.trim()) {
        setNewSpeakerData((prevNewSpeakerData => {
          return {
            ...prevNewSpeakerData,
            exampleLectures: [
              ...prevNewSpeakerData.exampleLectures,
              currentLecture.trim()
            ]
          }
        }))
        setCurrentLecture('')
        console.log(newSpeakerData.exampleLectures)
      }
    }
  }

  const handleRemoveLecture = (index) => {
    if (isEditing) {
      itemToEdit.exampleLectures.splice(index, 1)
      setItemToEdit((prevItemToEdit => {
        return {
          ...prevItemToEdit,
          exampleLectures: [
            ...prevItemToEdit.exampleLectures,
          ]
        }
      }))
    } else {
      newSpeakerData.exampleLectures.splice(index, 1)
      setNewSpeakerData((prevNewSpeakerData => {
        return {
          ...prevNewSpeakerData,
          exampleLectures: [
            ...prevNewSpeakerData.exampleLectures,
          ]
        }
      }))
    }
  }

  const handleRemoveReview = (index) => {
    if (isEditing) {
      itemToEdit.reviews.splice(index, 1)
      setItemToEdit((prevItemToEdit => {
        return {
          ...prevItemToEdit,
          reviews: [
            ...prevItemToEdit.reviews,
          ]
        }
      }))
    } else {
      newSpeakerData.reviews.splice(index, 1)
      setNewSpeakerData((prevNewSpeakerData => {
        return {
          ...prevNewSpeakerData,
          reviews: [
            ...prevNewSpeakerData.reviews,
          ]
        }
      }))
    }

  }


  const handleAddReview = () => {
    if (isEditing) {
      if (currentReview.trim()) {
        setItemToEdit((prevItemToEdit => {
          return {
            ...prevItemToEdit,
            reviews: [
              ...prevItemToEdit.reviews,
              currentReview.trim()
            ]
          }
        }))
        setCurrentReview('')
      }
    } else {
      if (currentReview.trim()) {
        setNewSpeakerData((prevNewSpeakerData => {
          return {
            ...prevNewSpeakerData,
            reviews: [
              ...prevNewSpeakerData.reviews,
              currentReview.trim()
            ]
          }
        }))
        setCurrentReview('')
      }
    }
    console.log("newSpeakerData:" + newSpeakerData.reviews + " " + isEditing)
  }

  const handleAddTopic = () => {
    if (isEditing) {
      if (currentTopic.trim()) {
        setItemToEdit((prevItemToEdit => {
          return {
            ...prevItemToEdit,
            topics: [
              ...prevItemToEdit.topics,
              currentTopic.trim()
            ]
          }
        }))
        setCurrentTopic('')
      }
    } else {
      if (currentTopic.trim()) {
        setNewSpeakerData((prevNewSpeakerData => {
          return {
            ...prevNewSpeakerData,
            topics: [
              ...prevNewSpeakerData.topics,
              currentTopic.trim()
            ]
          }
        }))
        setCurrentTopic('')
      }

    }

    console.log("newspeakerdata:" + newSpeakerData.topics + " " + isEditing)
    console.log("itemToEditdata" + itemToEdit.topics + " " + isEditing)
  }

  const handleRemoveTopic = (index) => {
    if (isEditing) {
      itemToEdit.topics.splice(index, 1)
      setItemToEdit((prevItemToEdit => {
        return {
          ...prevItemToEdit,
          topics: [
            ...prevItemToEdit.topics,
          ]
        }
      }))
    } else {
      newSpeakerData.topics.splice(index, 1)
      setNewSpeakerData((prevNewSpeakerData => {
        return {
          ...prevNewSpeakerData,
          topics: [
            ...prevNewSpeakerData.topics,
          ]
        }
      }))
    }
  }

  const displayUploadPopup = () => {
    setShowUploadPopup(true)
  }

  const closeUploadPopup = () => {
    setShowUploadPopup(false)
  }

  const closeErrorPopup = () => {
    setShowErrorPopup(false)
  }

  const displayEditPopup = () => {
    setShowEditPopup(true)
  }

  const closeEditPopup = () => {
    setShowEditPopup(false)
    setItemToEdit(null)
    setIsEditing(false)
  }

  function validateInput() {
    let newErrors = [];

    if (!validateEmail(itemToEdit ? itemToEdit.email : newSpeakerData.email)) {
      newErrors.push('Felaktig e-postadress');
    }

    if (!validatePhoneNumber(itemToEdit ? itemToEdit.phoneNumber : newSpeakerData.phoneNumber)) {
      newErrors.push('Telefonnumret måste vara 10 siffror');
    }

    if (!validateName(itemToEdit ? itemToEdit.name : newSpeakerData.name)) {
      newErrors.push('Namnet får inte vara tomt');
    }

    if (!validateImgUrl(itemToEdit ? itemToEdit.imgUrl : newSpeakerData.imgUrl)) {
      newErrors.push('Felaktig bild-URL till kortvyn');
    }

    if (!validateImgUrl(itemToEdit ? itemToEdit.imgUrl2 : newSpeakerData.imgUrl2)) {
      newErrors.push('Felaktig bild-URL till profilsida');
    }

    if (!validateShortDescription(itemToEdit ? itemToEdit.shortDescription : newSpeakerData.shortDescription)) {
      newErrors.push('Kort beskrivning får inte vara tom');
    }

    if (!validateTopics(itemToEdit ? itemToEdit.topics : newSpeakerData.topics)) {
      newErrors.push('Du måste välja minst ett ämne');
    }

    if (!validateHeader(itemToEdit ? itemToEdit.header : newSpeakerData.header)) {
      newErrors.push('Rubriken får inte vara tom');
    }

    if (!validateLongDescription(itemToEdit ? itemToEdit.longDescription : newSpeakerData.longDescription)) {
      newErrors.push('Lång beskrivning får inte vara tom');
    }

    if (!validateReviews(itemToEdit ? itemToEdit.reviews : newSpeakerData.reviews)) {
      newErrors.push('Recensionerna får inte vara tomma');
    }

    if (!validateExampleLectures(itemToEdit ? itemToEdit.exampleLectures : newSpeakerData.exampleLectures)) {
      newErrors.push('Exempelföreläsningarna får inte vara tomma');
    }

    setErrors(newErrors);

    return newErrors.length === 0;
  }

  const resetFields = () => {
    setIsEditing(false)
    console.log(isEditing)
    setItemToEdit(null)
    setCurrentStep(0)
  }

  return (
    <Router>
      <Navbar
        resetFields={resetFields}
      />
      <div className='page-content'>
        <Routes>
          <Route path="/" element={<h1>Välkommen</h1>} />
          <Route path={isEditing ? "edit-speaker" : "/new-speaker"} element={

            <div className='add-speaker-container'>
              <ProgressBar
                currentStep={currentStep}
                onStepClick={onStepClick}
              />

              {currentStep === 0 && (
                <div className='add-personalInfo-container'>
                  <InputPersonalInformation
                    newSpeakerData={newSpeakerData}
                    handleChange={handleChange}
                    itemToEdit={itemToEdit}
                  />
                </div>
              )}

              {currentStep === 1 && (
                <div className='add-card-container'>
                  <InputCard
                    newSpeakerData={newSpeakerData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleAddTopic={handleAddTopic}
                    handleRemoveTopic={handleRemoveTopic}
                    currentTopic={currentTopic}
                    itemToEdit={itemToEdit}
                  />
                  <OutputCard
                    newSpeakerData={newSpeakerData}
                    itemToEdit={itemToEdit}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className='add-card-container'>
                  <InputSpeakerProfile
                    newSpeakerData={newSpeakerData}
                    handleChange={handleChange}
                    currentLecture={currentLecture}
                    setCurrentLecture={setCurrentLecture}
                    currentReview={currentReview}
                    setCurrentReview={setCurrentReview}
                    handleAddLecture={handleAddLecture}
                    handleAddReview={handleAddReview}
                    handleRemoveLecture={handleRemoveLecture}
                    handleRemoveReview={handleRemoveReview}
                    itemToEdit={itemToEdit}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <>
                  <Accordion
                    newSpeakerData={newSpeakerData}
                    itemToEdit={itemToEdit}
                  />
                  <button className='upload-speaker' onClick={handleSubmit}>Ladda upp föreläsare</button>
                </>
              )}

              <div className='progress-buttons-container'>
                {currentStep > 0 && (
                  <button onClick={goBackwards} className='navigation-button'> Tillbaka </button>
                )}

                {currentStep < 3 && (
                  <button onClick={goForward} className='navigation-button'> Nästa </button>
                )}
              </div>

              {showUploadPopup && (
                <UploadPopup
                  closeUploadPopup={closeUploadPopup}
                />
              )}
              {showErrorPopup && (
                <ErrorPopup
                  errors={errors}
                  closeErrorPopup={closeErrorPopup}
                />
              )}
              {showEditPopup && (
                <EditConfirmationPopup
                  closeEditPopup={closeEditPopup}
                />
              )}

            </div>
          } />
          <Route path='/speakers' element={<Speakers
            setIsEditing={setIsEditing}
            setItemToEdit={setItemToEdit}
          />} />
          <Route path='/speaker/:id' element={
            <SpeakerProfile speakers={speakers} />
          }
          />
        </Routes>
      </div>

    </Router>
  )
}

export default App;
