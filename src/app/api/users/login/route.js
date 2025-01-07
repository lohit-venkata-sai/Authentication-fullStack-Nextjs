import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import { cookies } from "next/headers";

connect();
export async function POST(request){

    try{
        const reqBody = await request.json();
        console.log(reqBody);

        const {email,password}  =reqBody;

        const user = await User.findOne({email});
        if(!user){
            return new Response(JSON.stringify({error: 'user doest exists'}),{status : 300})
        }
        const passwordVerify = await bcryptjs.compare(password , user.password);
        if(!passwordVerify){
            return new Response(JSON.stringify({error : 'invalid password'}),{status : 400})
        }

        //create token data
        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }
        //create token 
        const token =jwt.sign(tokenData, process.env.TOKEN_SECRET,{expiresIn : '1h'})
        const getCookies = cookies();
        getCookies.set("token",token,{
            httpOnly : true,
            maxAge : 60 * 60
        });
        // const response  = new Response(JSON.stringify({
        //     message : 'login successful',
        //     success : true
        // }))
        // response.cookies.set('token', token, {httpOnly : true});
        return new Response(JSON.stringify({
            message : 'Login Successful',
            success :  true
        })); 
    }
    catch(e){
        console.log(e.message);
        return new Response(JSON.stringify({error : "cant login"},{status:500}))
    }
}