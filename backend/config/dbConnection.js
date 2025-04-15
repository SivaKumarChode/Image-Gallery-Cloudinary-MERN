const mongoose = require("mongoose");

const connection = async (req, res) => {
  try {
    const conn=await mongoose.connect(
      process.env.MONGO_URL ||
        "mongodb://localhost:27017/Image-Gallery-Cloudinary-MERN"
    )
    console.log(`database connected successfully ${conn.connection.host} -- ${conn.connection.port} -- ${conn.connection.name} `);
    
  } catch (error) {
    console.log(error);
  }
};

module.exports=connection