const jwt= require("jsonwebtoken");
const verifyToken =(req,res,next)=>{
      try{
        const token=req.cookies.token;
        if(!token){
          return res.status(401).json({success:false,msg:"unauthoriezd no  token provided"});
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET) //token verify kora
        if(!decoded){
           return res.status(401).json({success:false,msg:"unauthoriezd no token"});
        }

       req.userId=decoded.userId
       next();
      }
    catch(error){
        return res.status(401).json({
      success: false,
      msg: "Invalid or Expired Token",
    });
    }
}
module.exports=verifyToken;