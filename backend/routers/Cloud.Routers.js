const router =require("express").Router()
const CloudControllers=require("../controllers/Cloud.Controllers")
const {storage}=require("../utils/Cloud.Cloudinary")
const multer=require("multer")

const uploads=multer({storage})
// console.log(storage)

router.post("/upload",uploads.single("file"),CloudControllers.uploadSingle)
router.post("/uploads",uploads.array("files",10),CloudControllers.uploadMany)
router.get("/all-files",CloudControllers.getALl)
router.get("/single-file/:id",CloudControllers.getSingleFile)
router.delete("/delete-file/:public_id",CloudControllers.deleteFile)

module.exports=router