import { useQueryClient, useMutation } from "@tanstack/react-query";
import { TimeSheetFormData } from "../types/timesheetFormData";
import { setTimeSheet } from "./APIPoints";
import { UserAuth } from "../types/User";
import{setUserAuth} from "./APIPoints"

export function useSetUser(){
    return useMutation({
        mutationFn:(data:UserAuth)=>setUserAuth(data),
    })
}
export function useSetTimeSheet(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(data:TimeSheetFormData)=>setTimeSheet(data),
        onSuccess: () => {
            // Invalidate the query to refetch the data
            queryClient.invalidateQueries(['TimeSheetData']);
          },
    })
}