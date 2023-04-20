import React, { useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import { Link, useParams } from 'react-router-dom'
import { quizzes } from '../../quizzes';
import Button from '../../components/Button';

const StartQuiz = () => {
  const [showAnswer, setShowAnswer] = useState(false)
  const { id } = useParams()
  const quizId = parseInt(id, 10)
  const quiz = quizzes.find(q => q.id === quizId);

  return (
    <div className="w-full h-screen bg-gray-800 flex flex-col items-center justify-start p-5 gap-5 text-gray-100">
      <Link to="/quizzes" relative="path" className="w-2/3 justify-start">
        &larr; <span>Natrag</span>
      </Link>
      <h1 className="text-3xl font-bold">Započni kviz</h1>
      <p>{quiz.title}</p>
      
      <div className='w-full p-10 border-4'>        
          <Carousel
            showStatus={false}
            showThumbs={false}
            showArrows={true}
            showIndicators={true}
          >
            {quiz.questions.map((item) => (
              <div key={item.id} className='py-10 space-y-8'>
                <h1 className='text-3xl'>Pitanje br. {item.id}</h1>
                <h1 className='text-3xl'>{item.question}</h1>
                <div className='flex justify-center items-center gap-10'>
                  <Button label={showAnswer ? 'Sakrij odgovor' : 'Prikaži odgovor'} onClick={() => setShowAnswer(!showAnswer)} />
                  {showAnswer && <h2 className='text-3xl'>{item.answer}</h2>}
                </div>
              </div>
            ))}         
          </Carousel>           
      </div>
    </div>
  )
}

export default StartQuiz