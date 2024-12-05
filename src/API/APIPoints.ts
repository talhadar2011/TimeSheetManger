import axios from "axios"
import { TimeSheetFormData } from "../types/timesheetFormData"

const BASE_URL="http://localhost:3000"

const axiosInstance =axios.create({baseURL:BASE_URL})

export const getALLtimesheetsIds=async ()=>{
    return (await axiosInstance.get<TimeSheetFormData[]>('api/TimeSheetEntry')).data.map((timesheet)=>timesheet.Project)
}
export const setTimeSheet= async(data:TimeSheetFormData)=>{
    await axiosInstance.post("/api/TimeSheetEntry",data)
}
