import { useState } from "react";
import"../CSS/Form.css"
import { useDateContext } from "../Context/CalFormShareContext";
import { TimeSheetFormData } from "../types/timesheetFormData";
import { useTimesheetsIDs } from "../API/TSMQuery";
import { useSetTimeSheet } from "../API/TSMMutations";
import Toastmsg from "./Toastmsg";

export default function Form() {
    const [Project, setProject] = useState<string>("")
    const [SartTime, setStartTime] = useState<string>("")
    const [EndTime, setEndTime] = useState<string>("")

    const TimeSheetIDs=useTimesheetsIDs()
    const setTimeSheetData=useSetTimeSheet()

    if(setTimeSheetData.isSuccess){
        const toastElement = document.getElementById("toastSucess");
        const toast = new bootstrap.Toast(toastElement); 
        toast.show();
          
    }
    if(TimeSheetIDs.isPending){
        console.log("Pending")
    }else if(TimeSheetIDs.isSuccess){
        console.log(TimeSheetIDs.data)
        TimeSheetIDs.data.map((id)=>{
            console.log("ID Fatched")
        })
    }
    const { dates } = useDateContext();
    const formDataHandler =(event:any)=>{
        const{name,value}=event.target
        console.log(event.target);
        
        (name=="Project")?(setProject(value)):
        (name=="StartTime")?(setStartTime(value)):
        (setEndTime(value))
        
    }
    const formSubmitHandler=()=>{
        const FormData:TimeSheetFormData={
            Project:Project,
            StartDate:dates.startDate,
            EndDate:dates.endDate,
            StartTime:SartTime,
            EndTime:EndTime
        }
        setTimeSheetData.mutate(FormData)
    }
    return (
        <div >
            <Toastmsg/>
            <h3 className='TimeSheetFormh1'>TimeSheet Form</h3>
            <div className='TimeSheetForm'>
                <div className='Form'>
                    <div className="mb-3">
                        <label  className="form-label"> Project</label>
                        <select onChange={formDataHandler} name="Project" className="form-select" aria-label="Default select example">
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
                        <input onChange={formDataHandler} name="StartTime" type='time' className='form-control'></input>

                    </div>
                    <div className="mb-3">
                        <label  className="form-label"> EndTime</label>
                       <input onChange={formDataHandler} name="EndTime" type='time' className='form-control'></input>
                    </div>
                    <button onClick={formSubmitHandler} className='TimeSheetButton'> Submit TimeSheet</button>
                </div>
                {/* <button className='Collapsing'>x</button> */}

            </div>
        </div>
    )
}
