const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

 
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error stack:', err.stack);
  }

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
   
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

module.exports = errorHandler;