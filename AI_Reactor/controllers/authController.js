// const User = require("../models/userModel");
// const errorResponse = require("../utils/errorResponse");

// //jwt token
// exports.sendToken = (user, statusCode, res) => {
//   const token = user.getSignToken(res);
//   res.status(statusCode).json({
//     success: true,
//     token,
//   });
// };

// exports.registerController = async (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;
//     //extisting user
//     const extistingEmail = await User.findOne({ email });
//     if (extistingEmail) {
//       return next(new errorResponse("email is already register", 500));
//     }
//     const user = await User.create(username, email, password);
//     exports.sendToken(user, 201, res);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// exports.loginController = async (req, res, next) => {
//   try {
//     const{email,password}=req.body
//     //validation
//     //if email password not found

//     if(!email || !password){
//         return next(new errorResponse('please provide email or password',400))
//     }
//     const user=await User.findOne({email})
//     if(!user){
//         return next(new errorResponse('invalid credential',410))
//     }
//     const isMatch=await user.matchPassword(password)
//     if(!isMatch){
//         return next(new errorHandler('Invalid credential',401))
//     }
//     exports.sendToken(user,200,req)
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };
// exports.logoutController = async (req,res) => {
//     res.clearCookie('refreshToken')
//     return res.status(200).json({
//         success:true,
//         mewssage:"Logout successfully"
//     })
// };

const User = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

// JWT token generation function
exports.sendToken = (user, statusCode, res) => {
  const accessToken = user.getSignToken(res); // getSignToken sets the refresh token as a cookie
  res.status(statusCode).json({
    success: true,
    token: accessToken,
  });
};

exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return next(new errorResponse("Email is already registered", 400));
    }

    // Create new user
    const user = await User.create({ username, email, password });
    exports.sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return next(new errorResponse('Please provide email and password', 400));
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new errorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse('Invalid credentials', 401));
    }

    // Send token
    exports.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.logoutController = async (req, res) => {
  res.clearCookie('refreshToken');
  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};
