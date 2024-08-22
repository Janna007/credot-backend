import {ApiError} from '../utils/ApiError.js'


export const isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
      throw new ApiError(401,"Permission Denied!!Admin can only Access")
    }
    next();
  };
  

  