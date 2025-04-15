const mongoose=require("mongoose")
const ImageModel= new mongoose.Schema({
    imageURL:{
        type:String
    },
    originalName:{
        type:String
    },
    mimeType:{
        type:String
    },
    size:{
        type:String
    },
    public_id:{
        type:String
    },
    createdAt:{
        type:String,
        default:new Date()
    }

})

const Image=mongoose.model("ImageModel",ImageModel)
module.exports=Image