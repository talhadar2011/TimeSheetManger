const mongoose =require("mongoose")

const AuthSchema =mongoose.Schema(
    {
        UserName:{
            type:String,
            required:[true,"Please Select a UserName"]
        }
       
    },
    {
        timestamps:true
    }
)

const AuthModel = mongoose.model("Users",AuthSchema)
module.exports= AuthModel;