import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

  return (
    <header className='fixed bg-[#131314] text-white w-full flex items-center justify-between px-5 sm:px-10 py-5 shadow-md z-50'>
      <Link to="/" className='font-bold text-2xl hover:text-[#cf2e2e] transition'>Enterwell</Link>
      <div className='text-xl hover:text-[#cf2e2e] cursor-pointer transition'>Rejdov pub kviz</div>
    </header>
  )
}

export default Header