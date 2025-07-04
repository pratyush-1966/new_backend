const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req,res,next) =>{
  // check headers!!!
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthenticatedError('Credentials Invalid(token)');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token,process.JWT_SECRET);
    //attach the user to item routes
    req.user = {userId:payload.userId,name:payload.name}
    next()
  } catch (error) {
    throw new UnauthenticatedError('Credentials Invalid(token)');    
  }

}

module.exports = auth;