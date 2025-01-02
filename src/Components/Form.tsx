import { useEffect, useState } from "react";
import"../CSS/Form.css"
import { useDateContext } from "../Context/CalFormShareContext";
import { TimeSheetFormData } from "../types/timesheetFormData";
import { useTimesheetsIDs } from "../API/TSMQuery";
import { useSetTimeSheet } from "../API/TSMMutations";
import Toastmsg from "./Toastmsg";
import { useFunctionContext } from "../Context/FunctionContxt";

export default function Form() {
    
    const { dates,setDates } = useDateContext();
    // console.log(dates,"Datessss")
    const [Project, setProject] = useState<string>("")
    const [StartTime, setStartTime] = useState<string>("")
    const [EndTime, setEndTime] = useState<string>("")
    const TimeSheetIDs=useTimesheetsIDs()
    const setTimeSheetData=useSetTimeSheet()

    if(setTimeSheetData.isSuccess){
        const toastElement = document.getElementById("toastSucess");
        const toast = new bootstrap.Toast(toastElement); 
        toast.show();
          
    }
    if(TimeSheetIDs.isPending){
    }else if(TimeSheetIDs.isSuccess){
        // console.log(TimeSheetIDs.data)
        TimeSheetIDs.data.map((id)=>{
            // console.log("ID Fatched")
        })
    }
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
        // Calculate the difference in milliseconds
        const diffInMs = end - start;
      
        // Convert milliseconds to hours
        const hours = diffInMs / (1000 * 60 * 60);
      
        // Return the number of hours
        
         console.log(hours)
        if(hours<=8&&hours>0){
            console.log(dates.endDate,dates.startDate,"Date")
            const FormData:TimeSheetFormData={
                Project:Project,
                StartDate:dates.startDate,
                EndDate:dates.endDate,
                StartTime:StartTime,
                EndTime:EndTime,
                WorkingHours:hours
            }
            console.log(FormData,"Data")
         setTimeSheetData.mutate(FormData)
         //setDates({startDate:dates.startDate,endDate:dates.endDate,project:Project,starttime:StartTime,endtime:EndTime})

        }else{
            const toastElement = document.getElementById("toastOverTime");
            const toast = new bootstrap.Toast(toastElement);     
            toast.show();
        }
         
        // setDates({startDate:"",endDate:"",project:"",starttime:"",endtime:""})
    }
    const { definedFunction } = useFunctionContext();

    return (
        <div >
            <Toastmsg/>
            <h3 className='TimeSheetFormh1'>TimeSheet Form</h3>
            <div className='TimeSheetForm'>
                <div className='Form'>
                    <div className="mb-3">
                        <label  className="form-label"> Project</label>
                        <select onChange={formDataHandler} name="Project" value={Project} className="form-select" aria-label="Default select example">
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
                    <button onClick={() => {
        if (definedFunction) {
          definedFunction("Hello from Component Form");
        } else {
          console.log("Function not yet defined in Component A.");
        }
      }} className='TimeSheetButton'> Submit TimeSheet</button>
                </div>
                {/* <button className='Collapsing'>x</button> */}

            </div>
        </div>
    )
}
