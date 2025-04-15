require("dotenv").config()
const cloudinary=require("cloudinary").v2
const {CloudinaryStorage}=require("multer-storage-cloudinary")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"gallery",
        allowed_formats:["jpg","jpeg","png","pdf"],
        public_id:(req,file)=>file.originalname
    }
})

module.exports={cloudinary , storage}
