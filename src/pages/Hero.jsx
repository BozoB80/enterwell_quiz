import React, { useEffect, useState } from 'react'
import Button from '../components/Button'

const Hero = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch('http://quiz-maker.apidocs.enterwell.space/questions')
      .then(response => response.json())
      .then(data => setQuizzes(data))
      .catch(error => console.log(error));
  }, []);

  console.log(quizzes);

  return (
    <div className='w-full h-screen bg-gray-800 flex flex-col items-center justify-start p-5 gap-5 text-gray-100'>
      <div className='w-full flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>List of all quizzes:</h1>
        <Button link="/newQuiz" label="Create a new quiz" />
      </div>
      <table className='w-full text-center'>
        <thead className='border-gray-100 border bg-gray-500'>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}

export default Hero