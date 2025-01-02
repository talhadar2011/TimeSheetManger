import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import momentPlugin from '@fullcalendar/moment';
import"../CSS/Calander.css"
import Toastmsg from './Toastmsg';
import { useDateContext } from "../Context/CalFormShareContext";
import { useEffect, useState } from 'react';
import { useFunctionContext } from "../Context/FunctionContxt";

export default function Calander() {

    const { dates, setDates } = useDateContext();
    const [Event,setEvent]=useState([{
        title:"",
        date:""
    }])
    console.log(dates,"Data")
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
          console.log(formattedstartDate,"datesStart")
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
      }
      const { setDefinedFunction } = useFunctionContext();

      useEffect(() => {
        // Define the function
        const myFunction = (message: string): void => {
          console.log("Function defined in Component A:", message);
        };
    
        // Share the function through context
        setDefinedFunction(() => myFunction);
      }, [setDefinedFunction]);
    const eventSetHandler=()=>{
      if(dates.project!==""){
      const originalDate = dates.startDate;

      const [day, month, year] = originalDate.split("/");
      const formattedDate = new Date(`${year}-${month}-${day}`);
      const convertedDate = formattedDate.toISOString().split("T")[0];
      console.log(convertedDate,"Converted"); 
      setEvent([{title:dates.project,date:convertedDate}])
      }else{
        console.log("EventHandlerElse condition")
      }

    }
    useEffect(() => {
      // eventSetHandler()
      // setDates({project:""})

      // console.log(Event,"Event")
    }, [Event])
    return (
        <div className='Calendar'>
            <FullCalendar
      plugins={[ dayGridPlugin,interactionPlugin,momentPlugin ]}
      initialView="dayGridMonth"
      selectable={true}
      select={handleDateSelect}
      height="100%"
      weekends={false}
      events={Event}
        />
         {/* Toast Component */}
         <Toastmsg/>
        </div>
    )
}
