import{useQuery} from "@tanstack/react-query"
import { getALLtimesheetsIds } from "./APIPoints"
import { TimeSheetFormData } from "../types/timesheetFormData"
export function useTimesheetsIDs(){
    return useQuery({
        queryKey:['TimeSheetsIDs'],
        queryFn:getALLtimesheetsIds
    })
}


