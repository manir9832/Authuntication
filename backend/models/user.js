// const mongoose=require('mongoose');
// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//          type:String,
//         required:true
//     }
// });

// module.exports=mongoose.model('User',userSchema)




const mongoose=require('mongoose');
const userSchema=new mongoose.Schema ({
    name:{
        type:String,
        require:true
    },
    email:{
         type:String,
        require:true,
        unique:true
    },
    password:{
         type:String,
        require:true
    },
    lastlogin:{
        type:Date,
        default:Date.now
    },
    isverified:{
        type:Boolean,
        default:false
    },
    

   resetPasswordToken:String,
   resetPasswordExpiresAt:Date,
   verificationToken:String,
   verificationExpiresAt:Date
     


   
},{timestamps:true});

module.exports=mongoose.model("User",userSchema)