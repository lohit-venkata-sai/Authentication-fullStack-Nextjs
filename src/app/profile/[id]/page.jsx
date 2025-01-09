'use client';
import React from 'react'

const page = ({params}) => {
  return (
    <div className='flex flex-col justify-center text-center min-h-screen'>
      <p className='text-3xl'>ProfilePage
        <span className=' p-2 ml-2 text-center bg-orange-600 border-2 border-black rounded-md'>{params.id}</span>
      </p>
      
    </div>
  )
}

export default page
