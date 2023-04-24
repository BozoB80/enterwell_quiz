import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Button from "../../components/Button";

function NewQuiz() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const [availableQuestions, setAvailableQuestions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name,
      questions,
    };

    // SUBMIT THE FORM TO ALL QUIZZES API

    // fetch("http://quiz-maker.apidocs.enterwell.space/quizzes", {
    //   method: "POST",
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

  // FETCH ALL QUESTIONS FROM QUESTIONS API

  // useEffect(() => {
  //   fetch("http://quiz-maker.apidocs.enterwell.space/questions")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAvailableQuestions(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, ""]);
  };

  const handleRemoveQuestion = () => {
    setQuestions((prevQuestions) => prevQuestions.slice(0, -1));
  };

  const handleQuestionChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSelectQuestion = (question) => {
    const newQuestion = {
      id: availableQuestions.length + 1,
      question: availableQuestions.question,
      answer: availableQuestions.answer,
    };
    setQuestions([...availableQuestions, newQuestion]);
  };

  return (
    <div className="w-full h-screen pt-24 bg-gray-800 flex flex-col items-center justify-start p-2 sm:p-5 gap-2 text-gray-100">
      <Link to=".." relative="path" className="w-full sm:w-2/3 justify-start">
        &larr; <span>Natrag</span>
      </Link>
      <h1 className="text-2xl font-bold">STVORI NOVI KVIZ</h1>
      <p className="font-light">Optimalan broj pitanja je između 15 i 25</p>
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
              <label>
                Lista pitanja:
                <select
                  onChange={(event) =>
                    handleSelectQuestion(JSON.parse(event.target.value))
                  }
                  className="text-black ml-4 mt-2 rounded-sm"
                >
                  <option value="">Izaberi pitanje</option>
                  {availableQuestions.map((question) => (
                    <option key={question.id} value={JSON.stringify(question)}>
                      {question.question}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Button
                label="Dodaj pitanje"
                type="button"
                onClick={handleAddQuestion}
              />
              <Button
                label="Obriši pitanje"
                type="button"
                onClick={handleRemoveQuestion}
              />
            </div>
            <Button label="Stvori kviz" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewQuiz;
