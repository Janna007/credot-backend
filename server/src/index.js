// require('dotenv').config({path:'./env'})

import dotenv from "dotenv"
import connectDB from "./config/dbConnection.js"
import { app } from "./app.js"

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
   app.on("error",(error)=>{
       console.log("ERROR",error);
       throw error
   })
   app.listen(process.env.PORT || 8000 ,()=>{
      console.log(` server starts running on port
       ${process.env.PORT}`);
   })
})
.catch((err)=>{
   console.log("MONGO db connection failed ",err);
})

