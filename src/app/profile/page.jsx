'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
  const router = useRouter();
  async function onLogout(){
    try{
      await axios.get('/api/users/logout');
      router.push('/login');
    }
    catch(e){
      console.log(e.message);
      
    }
  }
  return (
    <div className='flex flex-col justify-center min-h-screen items-center'>
      <h1 className='text-3xl'>Profile Page</h1>
      <button className='bg-violet-500 hover:bg-violet-700 p-2 px-4 rounded text-black font-bold mt-4' onClick={onLogout}>Log Out</button>
    </div>
  )
}

export default page
