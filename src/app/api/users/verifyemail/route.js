import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


connect();

export async function POST(request){
    try {
        //get token from request
        const {token} = await request.json();

        console.log('token from post function',token);

        //find user by token and update is verified to true
        const user = await User.findOne({verifyToken : token, verifyTokenExpiry: {$gt: Date.now()}});

        if(!user){
            return new Response(JSON.stringify({error : 'Invalid Token'}),{status : 400})
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return new Response(JSON.stringify({
            message : 'verification successful',
            success : true
        }))
    } catch (error) {
        return new Response(JSON.stringify({error : 'with status 500'}),{status : 500})
    }
}