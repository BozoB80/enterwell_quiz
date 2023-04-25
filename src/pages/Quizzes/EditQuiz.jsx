import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { quizzes } from "../../quizzes";
import { motion } from "framer-motion";
import { slideAnimation } from "../../utils/motion";

function EditQuiz() {
  const { id } = useParams();
  const quiz = quizzes.find((item) => item.id == id);
  const allQuestions = quizzes.flatMap((quiz) => quiz.questions);

  const [name, setName] = useState(`${quiz.title}`);
  const [questions, setQuestions] = useState([
    ...quiz.questions,
    {
      question: quiz.questions.question,
      answer: quiz.questions.answer,
      selectedQuestion: ""
    },
  ]);
  const [availableQuestions, setAvailableQuestions] = useState([]);

  

  // useEffect(() => {
  //   // FETCH THE QUIZ DATA FROM THE API
  //   fetch(`http://quiz-maker.apidocs.enterwell.space/quizzes/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setName(data.name);
  //       setQuestions(data.questions);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, [id]);

  // useEffect(() => {
  //   // FETCH ALL QUESTIONS FROM QUESTIONS API
  //   fetch("http://quiz-maker.apidocs.enterwell.space/questions")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAvailableQuestions(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name,
      questions,
    };

    // SUBMIT THE FORM TO QUIZ API TO UPDATE THE QUIZ
    // fetch(`http://quiz-maker.apidocs.enterwell.space/quizzes/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Something went wrong with response");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { question: "", answer: "", selectedQuestion: "" },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((q, i) => i !== index)
    );
  };

  const handleQuestionChange = (event, index, field) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSelectChange = (e, index) => {
    const selected = allQuestions.find((q) => q.question === e.target.value);
    const newQuestions = [...questions];
    newQuestions[index].selectedQuestion = e.target.value;
    newQuestions[index].question = selected.question;
    newQuestions[index].answer = selected.answer;
    setQuestions(newQuestions);
  };

  return (
    <motion.div {...slideAnimation('down')} className="w-full min-h-screen pt-24 bg_gradient flex flex-col items-center justify-start px-2 sm:px-5 gap-2 text-gray-100">
      <Link
        to="/quizzes"
        relative="path"
        className="w-full sm:w-2/3 justify-start"
      >
        &larr; <span>Natrag</span>
      </Link>
      <h1 className="text-2xl font-bold">UREDI KVIZ</h1>
      <form className="w-full sm:w-2/3" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="name">
            Naziv kviza
          </label>
          <input
            className="w-full border border-gray-300 text-black p-2 rounded"
            type="text"
            id="name"
            name="name"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
            placeholder="Naziv kviza"
          />
        </div>
        <div>
          {questions.map((question, index) => (
            <div className="mb-4" key={index}>
              <label
                className="block font-bold mb-2"
                htmlFor={`question${index}`}
              >
                Pitanje br. {index + 1}
              </label>
              <input
                className="w-full border border-gray-300 text-black p-2 rounded mb-2"
                id={`question${index}`}
                name={`question${index}`}
                rows="1"
                value={question.question}
                onChange={(event) =>
                  handleQuestionChange(event, index, "question")
                }
                placeholder="Pitanje"
              />
              <input
                className="w-full border border-gray-300 text-black p-2 rounded"
                id={`answer${index}`}
                name={`answer${index}`}
                rows="1"
                value={question.answer}
                onChange={(event) =>
                  handleQuestionChange(event, index, "answer")
                }
                placeholder="Odgovor"
              />
              <div className="flex flex-col sm:flex-row justify-between sm:justify-center items-start sm:items-center mt-2 w-full truncate">
                <label className="text-sm sm:text-base">Izaberi pitanje:</label>
                <select
                  value={question.selectedQuestion}
                  onChange={(e) => handleSelectChange(e, index)}
                  className="text-black sm:mx-4 my-1 sm:my-2 rounded-sm text-sm w-full sm:w-1/3 sm:text-base"
                >
                  <option value="">Izaberi pitanje</option>
                  {allQuestions.map((item, i) => (
                    <option key={i + 1} value={item.question}>
                      {item.question} {item.answer}
                    </option>
                  ))}
                </select>

                <Button
                  label="Obriši pitanje"
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                />
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Button
                label="Dodaj pitanje"
                type="button"
                onClick={handleAddQuestion}
              />
            </div>
            <Button type="submit" label="Spremi promjene" className="mt-8" />
          </div>
        </div>
      </form>
    </motion.div>
  );
}

export default EditQuiz;
