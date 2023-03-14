const jwt = require("jsonwebtoken");

const User =require('../models/userModel')

const requireAuth =async (req, res, next) => {
  // verify Authentication of user

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Autorization token reuired!" });
  }

  // spliting the token into two parts and geting token from the authorization headers using split method
  const token = authorization.split(" ")[1]; //here [1] is the token beacause array start from [0]

  //verifying the token
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    
    //finfing the id in DB
    req.user= await User.findOne({_id}).select('_id')
    next()
  } catch (error) {
    console.log(error);
    return res.status(401).json({error: 'Request is not Autorized!'})
  }
}

module.exports=requireAuth
