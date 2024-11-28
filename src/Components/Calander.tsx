import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


export default function Calander() {
    return (
        <div>
            <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
    />
        </div>
    )
}
