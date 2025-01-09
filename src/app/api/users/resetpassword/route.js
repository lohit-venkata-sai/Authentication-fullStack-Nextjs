import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
const { connect } = require("@/dbConfig/dbConfig");


connect();

export async function POST(request){
    try {
         const {token, password}= await request.json();
         console.log(token,password);
         
         const user = await User.findOne({forgotPasswordToken : token , forgotPasswordTokenExpiry : {$gt: Date.now()}});
         console.log(user);
         if(!user){
            return new Response(JSON.stringify({error: 'token expired or invalid user'}),{status: 401})
         }
         //encrypt password
         const salt = await bcryptjs.genSalt(10);
         const hashed_password = await bcryptjs.hash(password,salt);

         user.password = hashed_password;
         user.forgotPasswordToken = undefined;
         user.forgotPasswordTokenExpiry  =undefined;
         await user.save();
         console.log(user);

         return new Response(JSON.stringify({
            message : 'password reset successfull',
            success : true
         }))
    } catch (error) {
        return new Response(JSON.stringify({error : `internal server error ${error}`}),{status : 500})
    }
}