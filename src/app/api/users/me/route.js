//how to grab user data from the database
import { connect } from "@/dbConfig/dbConfig";
import { getUserTokenData } from "@/helpers/getUserTokenData";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request){
    try{
        const { id }  =await getUserTokenData(request);
        const user = await User.findOne({_id : id}).select('-password');
        console.log(user);
        return NextResponse.json({
            message : 'User data fetched successfully',
            data : user
        })
    }
    catch(e){
        console.log(e.message);
        return NextResponse.json({error : e.message},{status : 500});
    }
}
