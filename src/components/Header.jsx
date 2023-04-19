import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

  return (
    <header className='w-full flex items-center justify-between px-10 py-5 shadow-md z-50'>
      <Link to="/" className='font-bold text-2xl'>Enterwell</Link>
      <div>Rejd's pub quiz</div>
    </header>
  )
}

export default Header