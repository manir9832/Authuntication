

const express=require('express');
const router=express.Router();
const {signup,verifyEmail,logout,login,forgotpassword,resetPassword,checkAuth}=require('../controllers/userController');
const verifyToken=require('../middleware/verifyToken')

router.get('/check-auth',verifyToken,checkAuth)
router.post('/login',login);
router.post('/signup',signup);
router.post('/verifyemail',verifyEmail);
router.post('/logout',logout);
router.post('/forgotpassword',forgotpassword)
router.post("/resetPassword/:token", resetPassword);
module.exports=router;
