"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'

function page() {
    const [token,setToken] = useState('');
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    async function verifyEmailPage(){
        try {
            setLoading(true);
            const response  = await axios.post('/api/users/verifyemail',{token});
            const data = await response.data;
            if(data?.success == true){
                setIsVerified(true);
                console.log(data.message);
            }
        } catch (error) {
            setError(true);
            console.log(error);
            throw new Error(error);
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        setToken(window.location.search.split('=')[1]);
    },[])
    useEffect(()=>{
        if (token.length >0){
            verifyEmailPage()
        }
    },[token])
  return (
    <div className='flex flex-col min-h-screen justify-center items-center bg-slate-600'>
      <div className=''>
        {
            token.length>0? token:'Token'
        }
        <br></br>
        {
            loading?'loading....':'not loading'
        }
        {
            isVerified && <p className='bg-green-900 text-white font-extrabold'>your email is verified successfully</p>
        }
        <br></br>
        {error && <p className='p-2 bg-red-700 text-white font-extrabold'>there is an error</p>}
      </div>
    </div>
  )
}

export default page
