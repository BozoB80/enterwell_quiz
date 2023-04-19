import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ label, link }) => {
  return (
    <button
      className='text-gray-100 font-medium text-xl border-2 px-3 py-2 rounded-md hover:text-gray-500 hover:bg-gray-200 hover:scale-105 hover: transition'
    >
      <Link to={link}>{label}</Link>
    </button>
  )
}

export default Button