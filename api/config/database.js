const mongoose=require("mongoose")


const connectDatabase=async()=>{

    try{
const connect=await mongoose.connect("mongodb://127.0.0.1:27017/todo",{
    useNewUrlParser:true,
    useunifiedTopology:true
})
console.log("connected to Db")
console.log(`mongoDb is connected to the host ${connect.connection.host}`) 
    }
    catch(err){
        console.error(err)
    }
}


module.exports=connectDatabase