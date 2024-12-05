import { useMutation } from "@tanstack/react-query";
import { TimeSheetFormData } from "../types/timesheetFormData";
import { setTimeSheet } from "./APIPoints";

export function useSetTimeSheet(){
    return useMutation({
        mutationFn:(data:TimeSheetFormData)=>setTimeSheet(data),
    })
}