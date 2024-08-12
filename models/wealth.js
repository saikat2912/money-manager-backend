
import mongoose from "mongoose"

const wealthSchema=new mongoose.Schema(
    {
        type:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        division:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        }
    }
)
export const wealth= mongoose.model("wealthReport",wealthSchema)