"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'

function page() {
    const [token,setToken] = useState('');
    const [text,setText] = useState('');
    const [error,setError] = useState({
        isTrue : false,
        error : ''
    })
    const [Password,setPassword] = useState({
        password : '',
        confirmPassword : ''
    });
    async function updateFunction(){
        try {
            const response = await axios.post('/api/users/resetpassword',{token,password :Password.password});
            const {message, success} = await response.data;
            if(success){
                console.log('message');
                setText(message);
            }

        } catch (error) {
            throw new Error(error);
        }
    }
    useEffect(()=>{
        setToken(window.location.search.split('=')[1]);
    },[])
    function checkfun(){
        const {password, confirmPassword} = Password;
        if(password=='' && confirmPassword==''){
            setError({...error,isTrue: true,error: 'fill the empty fields'})
        }
        else if(password !== confirmPassword){
            setError({...error,isTrue: true,error: 'recheck the password'})
        }
        else{
            setError({...error,isTrue: false,error: ''})
            updateFunction();
        }
    }
  return (
    <div className='flex flex-col min-h-screen items-center justify-center bg-blue-600'>
        {
            text.length>0 && <h1 className='bg-green-700 text-white p-2'>{text}</h1>
        }
      <label className='text-black font-bold text-1xl pt-1' htmlFor="password">Password</label>
      <input className='p-2  text-black rounded-md' type="password" name='password' placeholder='password' onChange={(e)=>setPassword({...Password,password : e.target.value})}/>

      <label className='text-black font-bold text-1xl pt-2' htmlFor="password">Confirm Password</label>
      <input className='p-2 rounded-md text-black' type="password" name='password' placeholder='re-enter password' onChange={(e)=>setPassword({...Password,confirmPassword : e.target.value})}/>

      <button onClick={checkfun} className='bg-red-600 text-black mt-5 p-2 rounded-md font-bold hover:bg-red-700'>Reset Password</button>
      {
        error.isTrue && <ul className='mt-4 text-black-500 bg-slate-400 p-3 rounded'>
            <li>{error.error}</li>
        </ul>
      }
    </div>
  )
}

export default page
