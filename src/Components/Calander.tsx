import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import momentPlugin from '@fullcalendar/moment';
import"../CSS/Calander.css"
export default function Calander() {

    
    const handleDateSelect = (selectInfo:any) => {
        const calendarApi = selectInfo.view.calendar;
        console.log(selectInfo)
        // Clear the selection by default
        calendarApi.unselect();
    
        const startDate = new Date(selectInfo.startStr);
        const endDate = new Date(selectInfo.endStr);
    
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); 
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endDate.setDate(endDate.getDate() - 1);
        const formattedstartDate = new Intl.DateTimeFormat("eu", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(startDate);
        const formattedendDate = new Intl.DateTimeFormat("eu", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(endDate);
        if (startDate >= firstDayOfMonth && endDate <= lastDayOfMonth) {
          alert(`Selected range: ${formattedstartDate} to ${formattedendDate}`);
          // Proceed with your logic here
        } else {
          alert("Please select dates within the current month only.");
        }
      };
    return (
        <div className='Calendar'>
            <FullCalendar
      plugins={[ dayGridPlugin,interactionPlugin,momentPlugin ]}
      initialView="dayGridMonth"
      selectable={true}
      select={handleDateSelect}
      height="100%"
      weekends={false}
      


    />
        </div>
    )
}
