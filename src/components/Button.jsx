import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ label, link, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='text-gray-100 font-light sm:font-medium text-sm sm:text-xl border-2 px-3 py-2 rounded-md hover:text-[#cf2e2e] hover:bg-gray-200 hover:scale-105 transition'
    >
      <Link to={link}>{label}</Link>
    </button>
  )
}

export default Button