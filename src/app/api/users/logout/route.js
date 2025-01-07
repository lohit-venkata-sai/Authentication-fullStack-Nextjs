import { cookies } from "next/headers";


export async function GET(){
    try{
        // const response = new Response(JSON.stringify({
        //     message : 'logout successful',
        //     success : true
        // }))
        // response.cookies.set('token' ,'' ,{
        //     httpOnly : true,
        //     maxAge : 0
        // });

        const myCookie = cookies();
        (await myCookie).set('token','',{
            httpOnly : true,
            expires : new Date(0)
        });
        return new Response(JSON.stringify({
            message: 'Logout Successfull',
            success : true
        }))
    }
    catch(error){
        console.log(error.message);
        return new Response(JSON.stringify({error : 'Internal server issue'}),{status : 500})
    }
}