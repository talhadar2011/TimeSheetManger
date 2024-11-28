import React from 'react'
import "../CSS/Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons'; // Ensure the correct icon import

export default function Header() {
    return (
        <div className='Header'>
            <h1>     
                       <FontAwesomeIcon icon={faBusinessTime} style={{marginLeft:"10px"}}/>
            </h1>
        </div>
    )
}
