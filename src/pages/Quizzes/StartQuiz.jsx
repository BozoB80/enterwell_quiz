import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { quizzes } from "../../quizzes";
import Button from "../../components/Button";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { RiFileCopy2Line } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { motion } from "framer-motion";
import { slideAnimation } from "../../utils/motion";
import { headTextAnimation } from "../../utils/motion";
import { zoomIn } from "../../utils/motion";

const StartQuiz = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const { id } = useParams();
  const quizId = parseInt(id, 10);
  const quiz = quizzes.find((q) => q.id === quizId);

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === quiz.questions.length - 1 ? 0 : currentSlide + 1
    );
  };
  const previousSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? quiz.questions.length - 1 : currentSlide - 1
    );
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)

      .then(() => {
        console.log("URL copied to clipboard:", url);
        setCopied(url);
      })
      .catch((error) => {
        console.error("Failed to copy URL:", error);
      });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-screen bg_gradient flex flex-col items-center justify-start p-1 sm:px-5 pt-24 gap-5 text-gray-100">
      <motion.div
        {...headTextAnimation}
        className="flex flex-col gap-4 w-full justify-center items-center"
      >
        <div className="w-full sm:w-2/3 flex justify-between items-center">
          <Link
            to="/quizzes"
            relative="path"
            className="w-full sm:w-2/3 justify-start"
          >
            &larr; <span>Natrag</span>
          </Link>
          <div
            onClick={() => handleCopy()}
            className="flex justify-center items-center gap-2 cursor-pointer"
          >
            {copied ? (
              <TiTick className="w-6 h-6 cursor-pointer" />
            ) : (
              <RiFileCopy2Line className="w-6 h-6 cursor-pointer" />
            )}
            <p className="text-sm">Kopiraj link</p>
          </div>
        </div>
        <p className="text-3xl">{quiz.title}</p>
      </motion.div>
      <motion.div
        {...slideAnimation("left")}
        className="relative w-full h-96 border rounded-sm"
      >
        <div onClick={previousSlide}>
          <BsChevronLeft
            onClick={() => setShowAnswer(false)}
            className="absolute top-[50%] left-0 sm:left-6 z-10 -translate-y-1/2 w-10 h-10 cursor-pointer hover:scale-110 active:scale-90 transition-all"
          />
        </div>
        <div onClick={nextSlide}>
          <BsChevronRight
            onClick={() => setShowAnswer(false)}
            className="absolute top-[50%] right-0 sm:right-6 z-10 -translate-y-1/2 w-10 h-10 cursor-pointer hover:scale-110 active:scale-90 transition-all"
          />
        </div>

        {quiz.questions.map((item, index) => (
          <div
            key={index}
            className="absolute flex justify-center items-center w-full h-full transition-all"
          >
            {index === currentSlide && (
              <motion.div
                {...slideAnimation("left")}
                className="flex flex-col justify-center items-center w-4/5 space-y-10 z-50"
              >
                <h1 className="text-3xl">Pitanje br. {item.id}</h1>
                <h1 className="text-xl sm:text-3xl text-center">{item.question}</h1>
                <div className="w-1/2 flex flex-col sm:flex-row justify-center items-center gap-10">
                  <Button
                    label={showAnswer ? "Sakrij odgovor" : "Prikaži odgovor"}
                    onClick={() => setShowAnswer(!showAnswer)}
                  />
                  {showAnswer && (
                    <motion.h2
                      variants={zoomIn(0.5, 1)}
                      initial="hidden"
                      whileInView="show"
                      className="w-screen sm:w-1/2 text-center text-5xl font-bold animate-bounce"
                    >
                      {item.answer}
                    </motion.h2>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default StartQuiz;
