const mongoose =require("mongoose")

const TSMSchema =mongoose.Schema(
    {
        Project:{
            type:String,
            required:[true,"Please Select a Project"]
        },
        StartDate:{
            type:String,
            required:true
        },
        EndDate:{
            type:String,
            required:true

        },
        StartTime:{
            type:String,
            required:true

        },
        EndTime:{
            type:String,
            required:true

        },
        WorkingHours:{
            type:Number,
            required:true

        }
    },
    {
        timestamps:true
    }
)

const TSMModel = mongoose.model("TimeSheetEntries",TSMSchema)
module.exports= TSMModel;