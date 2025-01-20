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
    // console.log(dates,"Datessss")
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
        console.log(setTimeSheetData,"data")
    }, [setTimeSheetData.isSuccess])
    // if(TimeSheetIDs.isPending){
    // }else if(TimeSheetIDs.isSuccess){
    //     // console.log(TimeSheetIDs.data)
    //     TimeSheetIDs.data.map((id)=>{
    //         // console.log("ID Fatched")
    //     })
    // }
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
         
            // if (definedFunction) {
            //   definedFunction(Project,dates.startDate,dates.endDate,StartTime,EndTime,hours);
            // } else {
            //   console.log("Function not yet defined in Component D.");
            // }
            setProject("")
            setStartTime("")
            setEndTime("")
            setDates({startDate:"",endDate:"",hours:0,endtime:"",project:"",starttime:""})
            console.log(dates)
        }else if(Project===""){
            const toastElement = document.getElementById("toastOverProject");
            const toast = new bootstrap.Toast(toastElement);     
            toast.show();   
        }
        
        else{
            const toastElement = document.getElementById("toastOverTime");
            const toast = new bootstrap.Toast(toastElement);     
            toast.show();
        }
         
    }
   // const { definedFunction } = useFunctionContext();

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
