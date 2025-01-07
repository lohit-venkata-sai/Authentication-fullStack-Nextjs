import { NextResponse } from "next/server";

export function middleware(request){
    const path = request.nexturl.pathname;
    const isPublicPath = path==='/login' || path ==='/signup';

    const token  = request.cookies.get('token')?.value || '';

    if(isPublicPath && token){
        return NextResponse.redirect('/profile');
    }

    if(!isPublicPath && !token){
        return  NextResponse.redirect('/login');
    }
    return NextResponse.next();
}

export const config={
    matcher : [
        '/',
        '/login',
        '/signup',
        '/profile'
    ]
}