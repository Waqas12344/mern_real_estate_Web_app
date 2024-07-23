import express from 'express'
const app = express();
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongoDB")
}).catch((err)=>{
    console.log(err);
})
app.listen(3000,()=>{
console.log("server in runing on port 3000")
});



// mongodb+srv://waqas:waqas2021-ag-5936skp@mern-estate.b2ukjdf.mongodb.net/?retryWrites=true&w=majority&appName=mern-estate