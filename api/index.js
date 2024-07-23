import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const app = express();
app.use(express.json());



import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js'
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongoDB")
}).catch((err)=>{
    console.log(err);
})
app.listen(3000,()=>{
console.log("server in runing on port 3000")
});


app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)


// mongodb+srv://waqas:waqas2021-ag-5936s kp@mern-estate.b2ukjdf.mongodb.net/?retryWrites=true&w=majority&appName=mern-estate