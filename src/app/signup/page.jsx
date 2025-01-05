"use client";

import React,{useState} from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios';

const page = () => {
  const route  =useRouter()
  const [isLoading,setIsLoading]  =useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })
  async function onSignup(params) {
    try{
      setIsLoading(true);
      const response = await axios.post('/api/users/signup',user);
      console.log('signup successful');
      route.push('/login');
    }
    catch(e){
      console.log('signup failed',e.message);
    finally{
      setIsLoading(false);
    }
  }
  return (
    <div className='flex flex-col bg-teal-400 text-black items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl mb-2 font-bold'> {isLoading? 'Processing...':'SignUp Page'}</h1>
      <hr />
      <label className='font-semibold' htmlFor='Username'>Username :</label>
      <input className='p-1 mb-6 rounded-md' type="username" id='username' name='text' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder='John Dev' />

      <label className='font-semibold' htmlFor='email'>Email :</label>
      <input className='p-1 mb-6 rounded-md' type="email" id='email' name='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='abc@example.com' />

      <label className='font-semibold' htmlFor="password">Password :</label>
      <input className='p-1 mb-6 rounded-md' type="password" id='password' name='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='password' />

      <button className='bg-violet-600 px-2 py-1 text-white cursor-pointer rounded-md' onClick={onSignup}>Signup</button>
      <Link className='text-red-900' href='/login'>click here to login</Link>
    </div>
  )
}

export default page
