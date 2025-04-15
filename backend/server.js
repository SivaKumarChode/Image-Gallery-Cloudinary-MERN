require("dotenv").config()
const express =require("express")
const cors=require("cors")
const connection= require("./config/dbConnection")
const CloudRouters=require("./routers/Cloud.Routers")
const app= express()

const PORT=process.env.PORT || 5500
connection()

app.use(cors({origin:"*"}))
app.use("/api",CloudRouters)


app.listen(PORT,()=>{
    console.log(`server running successfully ${PORT}`);
})
