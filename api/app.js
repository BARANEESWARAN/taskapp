const express=require("express")
const Toduroute=require("./router/todoRoute")
const cors=require("cors");
const app=express()

app.use(cors())
app.use(express.json())

app.use("/api/v2/",Toduroute)

module.exports=app
