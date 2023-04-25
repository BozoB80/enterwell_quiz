import React from "react";
import Button from "../components/Button";
import { quizzes } from "../quizzes";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineNotStarted } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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
    <div className="w-full h-screen pt-24 bg_gradient flex flex-col items-center justify-start px-2 sm:px-5 gap-5 text-gray-100">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl sm:text-3xl font-bold">Lista svih kvizova:</h1>
        <Button link="/quizzes/newquiz" label="Stvori novi kviz" />
      </div>
      <table className="w-full text-center border">
        <thead className="border-gray-100 rounded-md uppercase bg-gray-500">
          <tr>
            <th className="p-3">Br.</th>
            <th>Naziv</th>
            <th>Pokreni kviz</th>
            <th>Izbriši</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr
              key={quiz.id}
              className="border-gray-100 border w-full cursor-pointer hover:text-gray-500 hover:bg-gray-200 transition"
            >
              <td onClick={() => navigate(`/quizzes/editquiz/${quiz.id}`)}>
                {quiz.id}
              </td>
              <td
                onClick={() => navigate(`/quizzes/editquiz/${quiz.id}`)}
                className="sm:w-2/3"
              >
                {quiz.title}
              </td>
              <td className="py-3">
                <button
                  type="button"
                  onClick={() => navigate(`/quizzes/startquiz/${quiz.id}`)}
                >
                  <MdOutlineNotStarted
                    size={24}
                    className="hover:scale-125 hover:text-[#cf2e2e]"
                  />
                </button>
              </td>
              <td className="">
                <button type="button" onClick={() => deleteQuiz(quiz.id)}>
                  <RiDeleteBin5Line
                    size={24}
                    className="hover:scale-125 hover:text-[#cf2e2e]"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Quizzes;
