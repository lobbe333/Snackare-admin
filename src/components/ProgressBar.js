import React from 'react'
import '../styles/ProgressBar.css'

export default function ProgressBar({currentStep, onStepClick}) {


      
    return (
            <div className="progressbar-container">
                <div className='progress-step' onClick={() => onStepClick(0)}>
                    <div className={`circle ${currentStep >= 0 ? 'completed' : ''}`}>1</div>
                    <div className="circle-text">Personlig information</div>
                </div>
                <div className='progress-step' onClick={() => onStepClick(1)}>
                    <div className={`circle ${currentStep >= 1 ? 'completed' : ''}`}>2</div>
                    <div className="circle-text">Card-information</div>
                </div>
                <div className='progress-step' onClick={() => onStepClick(2)}>
                    <div className={`circle ${currentStep >= 2 ? 'completed' : ''}`}>3</div>
                    <div className="circle-text">Profil-information</div>
                </div>
                <div className='progress-step' onClick={() => onStepClick(3)}>
                    <div className={`circle ${currentStep >= 3 ? 'completed' : ''}`}>4</div>
                    <div className="circle-text">Sammanställning</div>
                </div>
            </div>
    )
}
