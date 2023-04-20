import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button";


const EditQuiz = () => {
  const [quiz, setQuiz] = useState({
    name: "",
    questions: [{ question: "", answer: "" }],
  });
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://quiz-maker.apidocs.enterwell.space/quizzes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setQuiz(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: quiz.name,
      questions: quiz.questions,
    };

    fetch(`http://quiz-maker.apidocs.enterwell.space/quizzes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong with response");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddQuestion = () => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, { question: "", answer: "" }],
    }));
  };

  const handleRemoveQuestion = () => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.slice(0, -1),
    }));
  };

  const handleQuestionChange = (event, index, key) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index][key] = event.target.value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleSelectQuestion = (question) => {
    const newQuestion = {
      id: quiz.questions.length + 1,
      question: question.question,
      answer: question.answer,
    };
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion],
    });
  };

  return (
    <div className="w-full h-screen bg-gray-800 flex flex-col items-center justify-start p-5 gap-5 text-gray-100">
      <h1 className="text-3xl font-bold">Edit Quiz</h1>
      {quiz ? (
        <form onSubmit={handleFormSubmit} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="title"
                name="title"
                type="text"
                placeholder="Enter quiz title"
                value={quiz.title}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" label="Save Changes" />
          </div>
        </form>
      ) : (
        <p>Loading quiz data...</p>
      )}
    </div>
  );
};

export default EditQuiz;
