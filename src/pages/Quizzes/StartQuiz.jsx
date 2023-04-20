import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import { useParams } from 'react-router-dom'
import { quizzes } from '../../quizzes';

const StartQuiz = () => {
  const { id } = useParams()
  const quizId = id
  const quiz = quizzes.find(q => q.id === quizId);

  console.log(quizzes);

  return (
    <div className="w-full h-screen bg-gray-800 flex flex-col items-center justify-start p-5 gap-5 text-gray-100">
      <h1 className="text-3xl font-bold">Start Quiz</h1>
      <p>{id}</p>
      
      <div className='w-full h-full'>
        <Carousel
          showStatus={true}
        >
          
        </Carousel>   
      </div>
    </div>
  )
}

export default StartQuiz