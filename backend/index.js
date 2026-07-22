const express=require('express');
const app=express();
const cors=require("cors");
const cookieParser=require('cookie-parser');
require('dotenv').config();
require('./config/db')
const userRoutes=require("./routes/userRoutes");
const PORT=process.env.PORT||2000;


app.use(
  cors({
    origin: [
      "https://authuntication.vercel.app", // 👈 মূল প্রডাকশন URL
      process.env.CLINT_URL, // 👈 প্রিভিউ URL
      "http://localhost:5173", // Localhost টেস্টিংয়ের জন্য
    ],
    credentials: true, // Cookies পাঠানোর জন্য অত্যন্ত জরুরি
  })
);
app.use(express.json());
app.use(cookieParser())

app.get('/',(req,res)=>{
   res.send('server running');
})

app.use("/api/auth",userRoutes);

app.listen(PORT,()=>{
    console.log(`server running on port http://localhost:${PORT}`)
})