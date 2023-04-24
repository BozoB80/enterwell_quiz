import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { quizzes } from "../../quizzes";

function NewQuiz() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answer: "", selectedQuestion: "" },
  ]);

  const allQuestions = quizzes.flatMap((quiz) => quiz.questions);

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
    <div className="w-full h-full pt-24 pb-64 bg-gray-800 flex flex-col items-center justify-start px-2 sm:px-5 gap-2 text-gray-100">
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

              <div className="flex flex-col sm:flex-row justify-between sm:justify-center items-start sm:items-center mt-2 w-full truncate">
                <label className="text-sm sm:text-base">Izaberi pitanje:</label>
                <select
                  value={question.selectedQuestion}
                  onChange={(e) => handleSelectChange(e, index)}
                  className="text-black sm:mx-4 my-1 sm:my-2 rounded-sm text-sm w-full sm:w-1/3 sm:text-base"
                >
                  <option value="">Izaberi pitanje</option>
                  {allQuestions.map((item) => (
                    <option key={item.id} value={item.question}>
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
            <Button label="Stvori kviz" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewQuiz;
