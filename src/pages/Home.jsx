import React from 'react'
import Button from '../components/Button'

const Home = () => {
  return (
    <div className='w-full h-screen bg-gray-800 flex flex-col items-center justify-center gap-5 text-gray-100'>
      <h1 className='text-2xl sm:text-3xl font-semibold'>Dobrodošli u Rejdov pub kviz</h1>
      <Button link="/quizzes" label="Kreni s kvizom" />
    </div>
  )
}

export default Home