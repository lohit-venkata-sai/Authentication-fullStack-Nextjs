import jwt from 'jsonwebtoken';
export async function getUserTokenData(request){
    try{
        const encodedToken = await request.cookies.get('token')?.value || '';
        const decodedToken = await jwt.verify(encodedToken,process.env.TOKEN_SECRET);

        return decodedToken;
    }
    catch(e){
        throw new Error(e.message);
    }
}