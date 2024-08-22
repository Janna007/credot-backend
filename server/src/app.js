import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler.js"


const app= express()

//configuration

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


//4 major configurations 

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/userRoutes.js'




app.use("/api/v1/users",userRouter)



app.use(errorHandler);

export { app }