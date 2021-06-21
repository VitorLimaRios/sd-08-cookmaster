const errorGenerator ={
  badRequest: (message)=>{
    return {
      statusCode:400,
      error: 'Bad Request',
      message
    };
  },
  conflict: (message)=>{
    return {
      statusCode: 409,
      error: 'Conflict',
      message,
    };
  }
};

module.exports = {
  errorGenerator
};