import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler.js"


const app= express()

//configuration

app.use(cors({
    origin: 'https://credot.vercel.app/', // Specify the exact origin of your frontend
    credentials: true // Allow cookies and other credentials
  }));


//4 major configurations 

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'



app.use("/api/v1/users",userRouter)
app.use("/api/v1/products",productRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/order",orderRouter)



app.use(errorHandler);

export { app }