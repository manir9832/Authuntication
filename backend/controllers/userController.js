const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto=require('crypto')
const {sendVerificationEmail,sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail} = require("../smtp/email");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "all filed are required" });
    }
    const existUser = await User.findOne({ email });
    console.log("user already exists", existUser);
    if (existUser) {
      return res.status(400).json({ msg: "user already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    const user = new User({
      email,
      password: hashPassword,
      name,
      verificationToken,
      verificationExpiresAt: Date.now() + 10 * 60 * 1000,
    });
    await user.save();

    //jwt
    //   const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
    //   res.cookie("token",token,{
    //     httpOnly:true,
    //     secure:process.env.NODE_ENV==="production",
    //     sameSite:"strict",
    //     maxAge:7*24*60*60*1000
    //   })
    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);
    res.status(201).json({
      msg: "signup succesfully",
      user: {
        user,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "internel error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, msg: "invalid user" });
    }
    if (!user.isverified) {
      return res.status(400).json({
        success: false,
        msg: "Please verify your email first",
      });
    }
    const isValidpassword = await bcrypt.compare(password, user.password);
    if (!isValidpassword) {
      return res.status(400).json({ success: false, msg: "invalid password" });
    }
    generateTokenAndSetCookie(res, user._id);
    user.lastlogin = new Date();
    await user.save();
    res.status(200).json({ success: true, msg: "loggin successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "invalid or expire verification code" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);
    return res
      .status(200)
      .json({ success: true, msg: "email verification succesfully", user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, msg: "logout succesfully" });
};

const forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, msg: "user not found" });
    }
  //generate random token

  const resetToken=crypto.randomBytes(20).toString("hex");
  const resetTokenExpiresAt=Date.now()+24*60*60*1000;
  
  user.resetPasswordToken=resetToken;
  user.resetPasswordExpiresAt=resetTokenExpiresAt;
 
  await user.save();

  //send email
  await sendPasswordResetEmail(user.email, `${process.env.CLINT_URL}/resetpassword/${resetToken}`);
  res.status(200).json({success:true,msg:"password reset link send to your email"});
  } catch (error) {
     console.error(`error sending forgotpassword`,error)
    throw error;
  }
};


const resetPassword=async(req,res)=>{
    try{
        const {token}=req.params;
        const {password}=req.body;
        const user=await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt:{$gt:Date.now()}
        });
        if(!user){
         res.status(400).json({ success:false, msg: "invalid or expiry token" });
        }
      //update password
      const hashedPassword=await bcrypt.hash(password,10);
      user.password=hashedPassword;
      user.resetPasswordToken=undefined;
      user.resetPasswordExpiresAt=undefined;
      await user.save(); 
      await sendResetSuccessEmail(user.email);
      res.status(200).json({success:true,msg:"password reset successfully"})
    }
    
    catch(error){
     console.error(`error sendig password reset not success`,error)
     throw error;
  }
    }

const checkAuth=async(req,res)=>{
    try{
        const user=await User.findById(req.userId).select("-password")
        if(!user){
             return res.status(404).json({success:false,msg:'user not found'});
        }
           
        return res.status(200).json({success:true,user})
    }
    catch(error){
        return res.status(404).json({success:false,msg:'internal server error'});
    }
}



module.exports = { signup, verifyEmail, logout, login, forgotpassword,resetPassword,checkAuth};
