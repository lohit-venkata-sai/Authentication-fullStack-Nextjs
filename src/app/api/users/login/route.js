import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";


export async function POST(request){

    try{
        const reqBody = await request.json();
        console.log(reqBody);

        const {email,password}  =reqBody;

        const user = User.findOne({email});
        if(!user){
            return new Response(JSON.stringify({error: 'user doest exists'},{status : 400}))
        }
        const passwordVerify = await bcryptjs.compare(password , user.password);
        if(!passwordVerify){
            return new Response(JSON.stringify({error : 'invalid password'},{status : 400}))
        }

        //create token data
        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }
        //create token 
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET,{expiresIn : '1d'})
        const response  = new Response(JSON.stringify({
            message : 'login successful',
            success : true
        }))
        response.cookies.set('token', token, {httpOnly : true});
        return response; 
    }
    catch(e){
        console.log(e.message);
        return new Response(JSON.stringify({error : "internal server error"},{status:500}))
    }
}