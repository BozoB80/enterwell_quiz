import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { quizzes } from "../../quizzes";
import Button from "../../components/Button";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

const StartQuiz2 = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { id } = useParams();
  const quizId = parseInt(id, 10);
  const quiz = quizzes.find((q) => q.id === quizId);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === quiz.questions.length - 1 ? 0 : currentSlide + 1);
  };
  const previousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? quiz.questions.length - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  return (
    <div className="w-full h-screen bg-gray-800 flex flex-col items-center justify-start p-1 sm:px-5 sm:pt-24 gap-5 text-gray-100">
      <Link
        to="/quizzes"
        relative="path"
        className="w-full sm:w-2/3 justify-start"
      >
        &larr; <span>Natrag</span>
      </Link>
      <p className="text-3xl">{quiz.title}</p>
      <div className="relative w-full h-full border rounded-sm">
        <div onClick={previousSlide}>
          <BsChevronLeft onClick={() => setShowAnswer(false)} className="absolute top-[50%] left-6 z-10 -translate-y-1/2 sm:w-10 sm:h-10 cursor-pointer hover:scale-110 active:scale-90 transition-all" />
        </div>
        <div onClick={nextSlide}>
          <BsChevronRight onClick={() => setShowAnswer(false)} className="absolute top-[50%] right-6 z-10 -translate-y-1/2 sm:w-10 sm:h-10 cursor-pointer hover:scale-110 active:scale-90 transition-all" />
        </div>

        {quiz.questions.map((item, index) => (
          <div
            key={index}
            className="absolute flex justify-center items-center w-[150%] md:w-full h-full transition-all"
          >
            {index === currentSlide && (
              <div className="flex flex-col justify-center items-center space-y-10 z-50">
                <h1 className="text-3xl">Pitanje br. {item.id}</h1>
                <h1 className="text-3xl">{item.question}</h1>
                <div className="flex justify-center items-center gap-10">
                  <Button
                    label={showAnswer ? "Sakrij odgovor" : "Prikaži odgovor"}
                    onClick={() => setShowAnswer(!showAnswer)}
                  />
                  {showAnswer && <h2 className="text-3xl">{item.answer}</h2>}
                </div>                                      
              </div>
            )}           
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartQuiz2;
