import { sendMail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";


connect();

export  async function POST(request){
    try {
        const {email} =  await request.json();

        const user = await User.findOne({email})
        if(!user){
            return new Response(JSON.stringify({error : 'User not found'}),{status : 400})
        }

        await sendMail({email:user.email, emailType:"RESET", userId:user._id})
        return new Response(JSON.stringify({
            message : 'Reset mail sent, check your mail inbox',
            success : true
        })
        )
    } catch (error) {
        return new Response(JSON.stringify({error : 'Internal Server Error'}),{status : 500})
    }
}