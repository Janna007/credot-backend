
export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || null;
  
   
    console.error(err.stack);
  
 
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined // Include stack trace only in development
    });
  };
  
  
  