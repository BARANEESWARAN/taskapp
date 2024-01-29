
const express=require("express")
const cors=require("cors");
const connectDatabase = require("./config/database");
const app=require("./app")
const path=require("path")
const dotenv=require("dotenv")
app.use(express.json())
app.use(cors())


//connect to mongoosh
// mongoose.connect("mongodb://127.0.0.1:27017/todo")
// .then(()=>console.log("connected to Db"))
// .catch((err)=>console.error(err))
connectDatabase()
dotenv.config({path:path.join(__dirname,"config","config.env")})


// Connecting Port
// app.listen(PORT,()=>console.log("Server started on port 8000"))
const server=app.listen(process.env.PORT,(err)=>{
    if(err) throw err
    else{
        console.log(`server running port ${process.env.PORT} in ${process.env.NODE_ENV}`)
    }
})
//Unhandled error - mongourl mistake
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`)
    console.log("sutting down server due to unhadle rejection")
    server.close(()=>{
        process.exit(1)
    })
})

//uncaughtException error - not defined variable

process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`)
    console.log("sutting down server due to uncaughtException")
    server.close(()=>{
        process.exit(1)
    })
})