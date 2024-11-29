import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import"../CSS/Calander.css"
export default function Calander() {
    return (
        <div className='Calendar'>
            <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
    />
        </div>
    )
}
