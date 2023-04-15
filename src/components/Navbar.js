import React from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'


export default function Navbar({ resetFields }) {

    return (
        <nav>
            <div className='navbar-logo'>
                <div className='logo-text'>
                    <div className='square-logo-header'>
                        <h1>Snackare</h1>
                        <div className='square-logo'>
                            <div className='diagonal'></div>
                        </div>
                    </div>
                    <h2>Ett nytänkande talarnätverk</h2>
                </div>
            </div>
            <ul className='navbar-links'>
                <li><Link className="nav-link" to='/'>Hem</Link></li>
                <li><Link className="nav-link" to='/speakers'>Föreläsare</Link></li>
                <li onClick={resetFields}  ><Link className="nav-link" to='/new-speaker'>Skapa en ny föreläsare</Link></li>
            </ul>

        </nav >
    )
}
