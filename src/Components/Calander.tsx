import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import momentPlugin from '@fullcalendar/moment';
import"../CSS/Calander.css"
import { useDateContext } from "./CalFormShareContext";

export default function Calander() {

    const { dates, setDates } = useDateContext();

    const handleDateSelect = (selectInfo:any) => {
        const calendarApi = selectInfo.view.calendar;
        // Clear the selection by default
        calendarApi.unselect();
    
        const startDate = new Date(selectInfo.startStr);
        const endDate = new Date(selectInfo.endStr);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() - 1);

        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); 
        firstDayOfMonth.setHours(0, 0, 0, 0); 

        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1,0);
        lastDayOfMonth.setHours(23, 59, 59, 999); 

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

           setDates({startDate:formattedstartDate,endDate:formattedendDate})
          // Proceed with your logic here
        } else {
        const toastElement = document.getElementById("toast");
        const toast = new bootstrap.Toast(toastElement); 
        toast.show();
          
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
         {/* Toast Component */}
         <div
                id="toast"
                className="toast align-items-center text-bg-danger border-0"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 1050,
                }}
            >
                <div className="d-flex">
                    <div className="toast-body">
                        Please select dates within the current month only.
                    </div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>
    )
}
