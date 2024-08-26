import { User } from "../models/user.model.js"
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { asyncHandler } from "../utils/AsyncHandler.js"

const generateAccessAndRefreshTokens=async (userId)=>{
    try {
        const user=await User.findById(userId)
        const accessToken=await user.generateAccessToken()
        const refreshToken=await user.generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something Went Wrong While Generating Refresh and Access Token")
    }
}

//register user


const registerUser=asyncHandler(async(req,res,next)=>{
       
           const {email,password}=req.body
            
            if ([email,password].some((field)=>field?.trim() === "")) {
                throw new ApiError(400,"All field is are  required!!!")
            }
    
            const existedUser=await User.findOne({email})
            if(existedUser){
                 throw new ApiError(409,"User Already Exist With this Email")
                // return res.status(409).json( new ApiError(409,"User Already Exist"))
            }
    
            let user = new User({ email, password });
            await user.save();
            
            const createdUser = await User.findById(user._id).select(
                "-password"
            )
    
            if(!createdUser){
                throw new ApiError(500,"Something Went Wrong")
               }
    
             return res.status(201).json(
                new ApiResponse(201, createdUser, "User registered Successfully") 
            ) 
    }    
)


//login user


const loginUser=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body

    if (!password && !email) {
        throw new ApiError(400,"password & Email is Required")
     }

      const user=await User.findOne({email})

      if(!user){
        throw new ApiError(404,"User does not exist")
     }

     const isPasswordValid =await user.isPasswordCorrect(password)

     if(!isPasswordValid){
        throw new ApiError(401,"Password is incorrect")
     }

     const {accessToken,refreshToken}= await generateAccessAndRefreshTokens(user._id)

     const loggedInUser=await User.findById(user._id).select("-password  -refreshToken")

     const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
      new ApiResponse ( 200,
        {
            user:loggedInUser,accessToken,refreshToken
        },
        "User Logged In Successfully")
    )

})




export {registerUser,loginUser}