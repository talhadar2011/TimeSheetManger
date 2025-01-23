import {  useEffect, useState } from "react";
import"../CSS/Form.css"
import { useDateContext } from "../Context/CalFormShareContext";
import { TimeSheetFormData } from "../types/timesheetFormData";
import { useTimeSheetData} from "../API/TSMQuery";
import { useSetTimeSheet } from "../API/TSMMutations";
import Toastmsg from "./Toastmsg";
import { useFunctionContext } from "../Context/FunctionContxt";

export default function Form() {
    
    const { dates,setDates } = useDateContext();
    const [Project, setProject] = useState<string>("")
    const [StartTime, setStartTime] = useState<string>("")
    const [EndTime, setEndTime] = useState<string>("")
    const [onDateClick, setonDateClick] = useState<boolean>(false)

    const setTimeSheetData=useSetTimeSheet()
   
    useEffect(() => {
        if(setTimeSheetData.isSuccess){
        const toastElement = document.getElementById("toastSucess");
        const toast = new bootstrap.Toast(toastElement); 
        toast.show();
        }
    }, [setTimeSheetData.isSuccess])
   
    const [Event,setEvent]=useState([{}])

    //Events/Entries from Db
    const TimeSheetData=useTimeSheetData()
    
     function FetchTimeSheetEvent(){
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
         setEvent(mappedEvents);
      }
     }
     
    useEffect(() => {
      FetchTimeSheetEvent()
    }, [TimeSheetData.isSuccess, TimeSheetData.data]);
    const formDataHandler =(event:any)=>{
        const{name,value}=event.target
         console.log(event.target);
        (name=="Project")?(setProject(value)):
        (name=="StartTime")?(setStartTime(value)):
        (setEndTime(value))
        
    }
    const formSubmitHandler=()=>{
       
        
        const start = new Date(`2024-01-01T${StartTime}`);
        const end = new Date(`2024-01-01T${EndTime}`);
        const diffInMs = end - start;
      
        const hours = diffInMs / (1000 * 60 * 60);
       //Getting all the booked dates and spliting the dates.
        let AlreadBookedDates=[{}]
        Event.map((date) => {
            AlreadBookedDates = [{ start: date.start.split('T')[0],end:date.end.split('T')[0],
                hours:date.hours,title:date.title },...AlreadBookedDates];
        });
       //Checking if the any of the selected date is already booked
        let BookingDateExist = AlreadBookedDates.some((d: any) => {
            if (!d.start || !d.end) return false; 
           
            return (
                (dates.startDate >= d.start && dates.startDate < d.end) || // New booking starts within existing
                (dates.endDate > d.start && dates.endDate <= d.end) ||   // New booking ends within existing
                (d.start >= dates.startDate && d.end <= dates.endDate) || // Existing booking is within the new booking
                (dates.startDate <= d.start && dates.endDate >= d.end) // New booking contains existing booking
            );
        });
        //if the already booked date found.
        if(BookingDateExist){
            //getting the hours from the matched date object.
            let BookingDateHours=AlreadBookedDates.filter((d:any)=>{
                if(  (dates.startDate >= d.start && dates.startDate < d.end) || // New booking starts within existing
                (dates.endDate > d.start && dates.endDate <= d.end) ||   // New booking ends within existing
                (d.start >= dates.startDate && d.end <= dates.endDate) || // Existing booking is within the new booking
                (dates.startDate <= d.start && dates.endDate >= d.end))
                {
                    return d
                }
    
            })
            let TotalhourBooked=0
            BookingDateHours.map((bdh)=>{
                TotalhourBooked+=bdh.hours
            })  
           
            if(TotalhourBooked+hours>8){
                const toastElement = document.getElementById("toastOverLappingDates");
                const toast = new bootstrap.Toast(toastElement);     
                toast.show();
            }else 
            if(TotalhourBooked>=8){
                const toastElement = document.getElementById("toastTotalBookabletimeCompleted");
                const toast = new bootstrap.Toast(toastElement);     
                toast.show();
            }else{
                if(hours<=8&&hours>0 && Project!=""){
                    const FormData:TimeSheetFormData={
                        Project:Project,
                        StartDate:dates.startDate,
                        EndDate:dates.endDate,
                        StartTime:StartTime,
                        EndTime:EndTime,
                        WorkingHours:hours
                    }
                    setTimeSheetData.mutate(FormData)
                 
                    
                    setProject("")
                    setStartTime("")
                    setEndTime("")
                    setDates({startDate:"",endDate:"",hours:0,endtime:"",project:"",starttime:""})
                }else if(Project===""){
                    const toastElement = document.getElementById("toastOverProject");
                    const toast = new bootstrap.Toast(toastElement);     
                    toast.show();   
                }else{
                    const toastElement = document.getElementById("toastOverTime");
                    const toast = new bootstrap.Toast(toastElement);     
                    toast.show();
                }
            }
            
        }else{
            if(hours<=8&&hours>0 && Project!=""){
                const FormData:TimeSheetFormData={
                    Project:Project,
                    StartDate:dates.startDate,
                    EndDate:dates.endDate,
                    StartTime:StartTime,
                    EndTime:EndTime,
                    WorkingHours:hours
                }
                setTimeSheetData.mutate(FormData)
             
                
                setProject("")
                setStartTime("")
                setEndTime("")
                setDates({startDate:"",endDate:"",hours:0,endtime:"",project:"",starttime:""})
            }else if(Project===""){
                const toastElement = document.getElementById("toastOverProject");
                const toast = new bootstrap.Toast(toastElement);     
                toast.show();   
            }else{
                const toastElement = document.getElementById("toastOverTime");
                const toast = new bootstrap.Toast(toastElement);     
                toast.show();
            }
        }
        

        
         
    }

    return (
        <div >
            <Toastmsg/>
            {
                (onDateClick)?(
                    <h3 className='TimeSheetFormh1'>TimeSheet Form</h3>

                ):(
                    <>
                    <h3 className='TimeSheetFormh1'>TimeSheet Form</h3>
            <div className='TimeSheetForm'>
                <div className='Form'>
                    <div className="mb-3">
                        <label  className="form-label"> Project</label>
                        <select onChange={formDataHandler} name="Project" value={Project} required className="form-select" aria-label="Default select example">
                            <option selected>Open this select </option>
                            <option value="FrontEnd">FrontEnd</option>
                            <option value="BackEnd">BackEnd</option>
                            <option value="AWS">AWS</option>
                        </select> 
                    </div>
                    <div className="mb-3">
                        <label  className="form-label"> StartDate</label>
                        <input onChange={formDataHandler} name="StartDate" type='text' className='form-control' value={dates.startDate}  placeholder='Select StartDate from Calander' disabled/>

                    </div>
                    <div className="mb-3">
                        <label  className="form-label"> EndDate</label>
                        <input onChange={formDataHandler} name="EndDate" type='text' className='form-control'value={dates.endDate}  placeholder='Select EndDate from Calander' disabled />

                    </div>
                    <div className="mb-3">
                        <label  className="form-label"> StartTime</label>
                        <input onChange={formDataHandler} name="StartTime" value={StartTime} type='time' className='form-control'></input>

                    </div>
                    <div className="mb-3">
                        <label  className="form-label"> EndTime</label>
                       <input onChange={formDataHandler} name="EndTime" value={EndTime} type='time' className='form-control'></input>
                    </div>
                    <button onClick={formSubmitHandler} className='TimeSheetButton'> Submit TimeSheet</button>
                </div>
                {/* <button className='Collapsing'>x</button> */}

            </div>
            </> 
                )
            }
            

        </div>
    )
}
