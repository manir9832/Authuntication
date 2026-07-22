const jwt=require('jsonwebtoken')

const generateTokenAndSetCookie =(res,userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"2h"});

    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite: isProduction ? "none" : "lax",
        maxAge:7*24*60*60*1000
    });
}


module.exports=generateTokenAndSetCookie;