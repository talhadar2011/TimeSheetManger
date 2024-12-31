import axios from "axios"
import { TimeSheetFormData } from "../types/timesheetFormData"
import { UserAuth } from "../types/User"

const BASE_URL="http://localhost:3000"

const axiosInstance =axios.create({baseURL:BASE_URL})
//GetUser
export const getUser= async(UserName:string)=>{
   return (await axiosInstance.get(`/api/SignIn/${UserName}`)).data.UserName
}
//CreateUser
export const setUserAuth= async(data:UserAuth)=>{
    await axiosInstance.post("/api/SignUp",data)
}
//GET ALL IDS
export const getALLtimesheetsIds=async ()=>{
    return (await axiosInstance.get<TimeSheetFormData[]>('api/TimeSheetEntry')).data.map((timesheet)=>timesheet.Project)
}
//GET TIMESHEET DATA FROM FORM
export const setTimeSheet= async(data:TimeSheetFormData)=>{
    await axiosInstance.post("/api/TimeSheetEntry",data)
}
