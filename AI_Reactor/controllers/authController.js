const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

//jwt token
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //extisting user
    const extistingEmail = await userModel.findOne({ email });
    if (extistingEmail) {
      return next(new errorResponse("email is already register", 500));
    }
    const user = await userModel.create(username, email, password);
    this.sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const{email,password}=req.body
    //validation
    //if email password not found
    if(!email || !password){
        return next(new errorResponse('please provide email or password'))
    }
    const user=await userModel.findOne({email})
    if(!user){
        return next(new errorResponse('invalid credential',410))
    }
    const isMatch=await userModel.matchPassword(password)
    if(!isMatch){
        return next(new errorHandler('Invalid credential',410))
    }
    this.sendToken(user,200,req)
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.logoutController = async (req,res) => {
    res.clearCookie('refreshToken')
    return res.status(200).json({
        success:true,
        mewssage:"Logout successfully"
    })
};
