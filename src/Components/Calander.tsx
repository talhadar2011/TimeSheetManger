import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import momentPlugin from '@fullcalendar/moment';
import"../CSS/Calander.css"
import Toastmsg from './Toastmsg';
import { useDateContext } from "../Context/CalFormShareContext";
import { useEffect, useState } from 'react';
import { useFunctionContext } from "../Context/FunctionContxt";
import { Tooltip } from 'bootstrap';
import { useTimeSheetData } from '../API/TSMQuery';

export default function Calander() {

    const { dates, setDates } = useDateContext();
    const [Event,setEvent]=useState([{}])
    //Already Created Events/Entries from Db
      const TimeSheetData=useTimeSheetData()
    
    
    useEffect(() => {
      if (TimeSheetData.isSuccess && TimeSheetData.data) {
        const mappedEvents = TimeSheetData.data.map((data) => {
          if (data.StartDate === data.EndDate) {
            return {
              date: data.StartDate ,
              hours: data.WorkingHours,
              title: data.Project,
            };
          } else {
            return {
              start: data.StartDate + 'T' + data.StartTime,
              end: data.EndDate + 'T' + data.EndTime,
              hours: data.WorkingHours,
              title: data.Project,
            };
          }
        });
        console.log(mappedEvents,"Events")
         setEvent(mappedEvents);
      }
    }, [TimeSheetData.isSuccess, TimeSheetData.data]);
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

        const formattedstartDate = new Intl.DateTimeFormat("en-CA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(startDate);
        const formattedendDate = new Intl.DateTimeFormat("en-CA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(endDate);
          console.log(formattedstartDate,"FormattedDates")
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
      
      //new Event/Entries
      useEffect(() => {
        const myFunction = (project:string,startdate:string, enddate:string,starttime:string,endtime:string,hours:number): void => {
            
            // const start = new Date(startdate);
            // const end = new Date(enddate);
            // const events = [];
            // while (start <= end) {
            //   events.push({
            //     title: project, 
            //     date: new Date(start).toISOString().split("T")[0], 
            //   });
            //   start.setDate(start.getDate() + 1); 
            // }
            const start=startdate+"T"+starttime
            const end=enddate+"T"+endtime
            if(startdate===enddate){
              setEvent([...Event,{
                title:project,
                date:startdate,
                description: project,
                hours:hours
              }])
            }else
            {
              setEvent([...Event,{
                title:project,
                start:start,
                end:end,
                description: project,
                hours:hours
                
              }])
            }
              
      
        };
        console.log(Event,"Events")
        setDefinedFunction(() => myFunction);
      }, [setDefinedFunction,Event]);
      
      const handleEventClick = (arg) => {
        // console.log(arg.event.extendedProps.description)
        // var tooltip = new Tooltip(arg.el, {
        //   title: arg.event.extendedProps.description,
        //   placement: 'top',
        //   trigger: 'hover',
        //   container: 'body'
        // });
        
        console.log("Clicked",dates,arg)
      }
    return (
        <div className='Calendar'>
            <FullCalendar
              plugins={[ dayGridPlugin,interactionPlugin,momentPlugin ]}
              initialView="dayGridMonth"
              selectable={true}
              select={handleDateSelect}
              height="100%"
              weekends={false}
              nextDayThreshold= '09:00:00'
              events={Event}
              eventClick={handleEventClick}
              eventColor='#2c3e50'
              eventBorderColor="#34495e"
              eventTextColor='white'
        />
         {/* Toast Component */}
         <Toastmsg/>
        </div>
    )
}
