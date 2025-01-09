'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
  const router = useRouter();
  async function resetPassword(){
  }
  async function getDetails(){
    try {
      const response = await axios.get('/api/users/me');
      const {data} = response.data;
      console.log(data.message);

      if(data?._id){
        router.push(`/profile/${data._id}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
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
      <button onClick={getDetails}  className='bg-teal-500 hover:bg-teal-700 p-2 px-4 rounded text-black font-bold mt-4'>Get User Details</button>
      <button onClick={resetPassword}  className='bg-yellow-600 hover:bg-yellow-800 p-2 px-4 rounded text-black font-bold mt-4'>Reset Password</button>
    </div>
  )
}

export default page
