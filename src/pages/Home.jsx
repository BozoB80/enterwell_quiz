import React from 'react'
import Button from '../components/Button'
import { motion } from 'framer-motion'
import { headContentAnimation } from '../utils/motion'

const Home = () => {
  return (
    <motion.div {...headContentAnimation} className='w-full h-screen bg_gradient flex flex-col items-center justify-center gap-5 text-gray-100 shadow-2xl'>
      <h1 className='text-2xl sm:text-5xl font-semibold'>Dobrodošli u Rejdov pub kviz</h1>
      <Button link="/quizzes" label="Započni kviz" />
    </motion.div>
  )
}

export default Home