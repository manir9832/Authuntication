// const mongoose=require('mongoose');
// const dns=require('dns');
// const db=process.env.MONGO_URI;

// dns.setServers([
//     '1.1.1.1',
//     '8.8.8.8'
// ]);

// const connectDB =async()=>{
//     try{
//         await mongoose.connect(db);
//         console.log('mongodb connected succesfully');
//         console.log("Database:", mongoose.connection.name);
//         console.log("Host:", mongoose.connection.host);
        
//     }
//     catch(error){
//         console.log("error:",error);
//     }
// }

// connectDB();



const mongoose=require('mongoose');
const dns=require('dns');
require('dotenv')
const db=process.env.MONGO_URI;

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

const connectDB=async(req,res)=>{
    try{
        await mongoose.connect(db);
        console.log('mongodb connected successfully');
        console.log(mongoose.connection.host);
    }
    catch(error){
        console.log("error",error)
    }
};
connectDB();