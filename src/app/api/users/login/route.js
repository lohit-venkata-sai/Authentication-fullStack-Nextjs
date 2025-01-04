import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt from 'jsonwebtoken'
import bcryptjs from "bcryptjs"
import ResponseCache from "next/dist/server/response-cache";
connect()

export async function POST(request){
    try{
        const reqBody  = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        //check if user exists
        const user  = User.findOne({email});
        if(!user){
            return new Response(JSON.stringify({error: 'user doesnt exists'+error},{status: 400}))
        }

        //check if password is correct 
        const check = await bcryptjs.compare(password , user.password)

        if (!check){
            return Response(JSON.stringify({error:"invalid password"},{status: 400}));
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email : user.email
        }
        const token = await jwt.sign(tokenData ,process.env.TOKEN_SECRET ,{expiresIn: '1d'})

        const response = new Response(JSON.stringify({
            message : 'login successful',
            success : true 
        }))
        response.cookies.set('token', token , {
            httpOnly : true,
        })
        return response

        
    }
    catch(e){
        return new Response(JSON.stringify({error: "error at signing u in "+error.message},{status: 500}));
    }
}