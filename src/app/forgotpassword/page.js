"use client";
import axios from 'axios';
import React, { useState } from 'react'

function page() {
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  async function onSubmit() {
    try {
      const response = await axios.post('/api/users/forgotpassword', { email });
      const { message, success } = response.data;
      console.log(message);
      if (success) {
        setText(message);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  return (
    <div className='flex flex-col min-h-screen items-center justify-center bg-blue-600'>

      <label className='text-black text-1xl pt-1 font-bold' htmlFor="email">Email</label>
      <input className='p-2 text-black rounded-md' type="email" name='email' placeholder='abc@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />

      <button onClick={onSubmit} className='bg-red-600 text-black mt-5 p-2 rounded-md font-bold hover:bg-red-700'>Submit</button>
      {
        text.length > 0 && <p className='pt-4 text-black'>{text}</p>
      }
    </div>
  )
}

export default page
