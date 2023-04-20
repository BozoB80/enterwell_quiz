import React from "react";
import Button from "../components/Button";
import { quizzes } from "../quizzes";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const Quizzes = () => {
  const navigate = useNavigate();

  // const deleteQuiz = (id) => {
  //   fetch(`http://quiz-maker.apidocs.enterwell.space/quizzes/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Something went wrong with response");
  //       }
  //       console.log(`Quiz with id ${id} deleted successfully.`);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  return (
    <div className="w-full h-screen bg-gray-800 flex flex-col items-center justify-start p-5 gap-5 text-gray-100">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold">List of all quizzes:</h1>
        <Button link="/quizzes/newquiz" label="Create a new quiz" />
      </div>
      <table className="w-full text-center">
        <thead className="border-gray-100 border bg-gray-500">
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Start</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr
              key={quiz.id}
              className="border-gray-100 border w-full cursor-pointer hover:text-gray-500 hover:bg-gray-200 hover:transition"
            >
              <td onClick={() => navigate(`/quizzes/editquiz/${quiz.id}`)}>
                {quiz.id}
              </td>
              <td onClick={() => navigate(`/quizzes/editquiz/${quiz.id}`)}>
                {quiz.title}
              </td>
              <td onClick={() => navigate(`/quizzes/startquiz/${quiz.id}`)}>Start the quiz</td>
              <td className="flex justify-center">
                <RiDeleteBin5Line
                  size={24}
                  onClick={() => deleteQuiz(quiz.id)}
                  className="hover:scale-125"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Quizzes;
