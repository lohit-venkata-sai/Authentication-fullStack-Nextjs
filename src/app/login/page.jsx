"use client";

import React, { useState} from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios';

const page = () => {
  const router  =useRouter()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [loading,setLoading]  = useState(false)
  async function onLogin() {
    try{
      setLoading(true);
      const response  =await axios.post('/api/users/login',user);
      console.log(response);
      console.log('log in successful',response.data);
      if (response.data.success){
        router.push('/profile');
     }
    }
    catch(error){
      setLoading(false);
      console.log(error.message);
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col bg-teal-400 text-black items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl mb-2 font-bold'>{loading? 'processing....': 'Login'}</h1>
      <hr />
      <label className='font-semibold' htmlFor='email'>Email :</label>
      <input className='p-1 mb-6 rounded-md' type="email" id='email' name='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='abc@example.com' />
      
      <label className='font-semibold' htmlFor="password">Password :</label>
      <input className='p-1 mb-6 rounded-md' type="password" id='password' name='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='password' />

      <button className='bg-violet-600 px-2 py-1 text-white cursor-pointer rounded-md' onClick={onLogin}>Login</button>
      <Link className='text-underlined' href="/forgotpassword">Forgot Password</Link>
      <Link className='text-red-900' href='/signup'>click here to signup</Link>
    </div>
  )
}

export default page
