import React from 'react'
import Button from '../components/Button'

const Home = () => {
  return (
    <div className='w-full h-screen bg-gray-800 flex flex-col items-center justify-center gap-5 text-gray-100'>
      <h1 className='text-3xl font-semibold'>Welcome to Enterwell pub quiz</h1>
      <Button link="/hero" label="Enter here" />
    </div>
  )
}

export default Home