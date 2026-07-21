const express=require('express');
const app=express();
const cors=require("cors");
const cookieParser=require('cookie-parser');
require('dotenv').config();
require('./config/db')
const userRoutes=require("./routes/userRoutes");
const PORT=process.env.PORT||2000;

app.get('/',(req,res)=>{
   res.send('server running');
})
app.use(cors(
    {
    origin: "http://localhost:5173",
    credentials: true,
  }
))
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",userRoutes);

app.listen(PORT,()=>{
    console.log(`server running on port http://localhost:${PORT}`)
})