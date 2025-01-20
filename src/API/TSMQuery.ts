import{useQuery} from "@tanstack/react-query"
import { getALLtimesheetsIds,getUser,getALLtimesheets } from "./APIPoints"
import { UserAuth } from "../types/User"
export function useTimesheetsIDs(){
    return useQuery({
        queryKey:['TimeSheetsIDs'],
        queryFn:getALLtimesheetsIds
    })
}
export function useUserName(UserName:string){
    return useQuery({
        queryKey:['GetUserName',UserName],
        queryFn:()=>getUser(UserName)
    })
}
export function useTimeSheetData(){
    return useQuery({
        queryKey:['TimeSheetData'],
        queryFn:getALLtimesheets
    })
}


