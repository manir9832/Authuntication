const transport =require("./mailtarp") ;
const {VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE}=require("./emailTemplate")


const sendVerificationEmail = async (email, verificationToken) => {
  
  try {
    const response = await transport.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{otp}", verificationToken),
      category: "email verification",
    });
    console.log("email verification successfully",response)
  } catch (error) {
    console.error(`error sending verification`,error)
    throw error;
  }
};

const sendWelcomeEmail=async(email,name)=>{
 
  try{
     const response= await transport.sendMail({
      from:process.env.SMTP_USER,
      to:email,
      subject:"welcome",
       html: `<h2>Welcome ${name}</h2>`
         
    
    });
    console.log("email sent successfully",response)
  }
  catch(error){
    console.error(`error sending verification`,error)
    throw error;
  }
}

const sendPasswordResetEmail=async(email,resetURL)=>{
  
  try{
      const response = await transport.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "reset password",
    });
    console.log("password reset succeesfully",response)
  }
  catch(error){
     console.error(`error sending resetpassword`,error)
    throw error;
  }
}

const sendResetSuccessEmail=async(email)=>{
   
   try{
     const response = await transport.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "password reset successfully",
      html:PASSWORD_RESET_SUCCESS_TEMPLATE, 
      category: "reset success",
    });
    console.log("password reset succes",response)
   }
   catch(error){
     console.error(`error sending not success password reset`,error)
    throw error;
  }
}

module.exports={sendVerificationEmail,sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail};