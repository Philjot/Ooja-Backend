import mongoose from "mongoose";
import cors from 'cors';
import express from 'express';
import  dotenv from 'dotenv'
import bodyParser from "body-parser";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";



dotenv.config()

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));


app.use('/api/v1/auth', userRouter)
app.use('/api/v1/product', productRouter)

const PORT = process.env.PORT || 4500


app.listen(PORT, (err)=>{
    console.log('listening at '+ PORT)
})


mongoose.connect(process.env.atlas)
.then(()=>{
    console.log('Ooja is connected')
})

.catch((err)=> {
    console.log(err)
})