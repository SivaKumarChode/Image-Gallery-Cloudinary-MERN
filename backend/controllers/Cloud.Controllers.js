const Image = require("../models/Cloud.model");
const {cloudinary}=require("../utils/Cloud.Cloudinary")
const CloudControllers = {
  uploadSingle: async (req, res) => {
    try {
      console.log("update------>", req.file);

      const newFile = new Image({
        imageURL: req.file.path,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        public_id: req.file.filename,
      });
      await newFile.save();
      res.status(200).json({
        message: "file uploaded successfully",
        newFile,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  uploadMany: async (req, res) => {
    try {
      if (!req.files || !req.files.length === 0) {
        return res.status(400).json({
          message: "At least one file is required !",
        });
      }
      const newFiles = await req.files.map((file) => ({
        imageURL: file.path,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        public_id: file.filename,
      }));
      const saveFile = await Image.insertMany(newFiles);
      res.status(200).json({
        message: "multiple files uploaded successfully",
        saveFile,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getALl: async (req, res) => {
    try {
      const allFiles = await Image.find({});
      if (!allFiles) {
        return res.status(400).json({
          message: "Files not found !",
        });
      }
      res.status(200).json({
        message: "all files are --",
        allFiles,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getSingleFile: async (req, res) => {
    try {
        const {id}=req.params
        const single=await Image.findById(id)
        if(!single){
            return res.status(400).json({
                message:"single file not found !"
            })
        }
        res.status(200).json({
            message:"single file ",
            single
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
          });
    }
  },

  deleteFile: async (req, res) => {
      const {public_id}=req.params
      console.log(public_id);
    try {
        
        await cloudinary.uploader.destroy(`gallery/${public_id}`)
        const del=await Image.findOneAndDelete(`gallery/${public_id}`)
        if (!del){
            return res.status(400).json({
                message:"file not found !"
            })
        }
        res.status(200).json({
            message:"file deleted in mongodb and cloudinary ",
            del
        })
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};
module.exports = CloudControllers;
