"use client";
import React, { useEffect, useState } from "react";
import { Card, Pagination } from "flowbite-react";

const ViewQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quizzesPerPage] = useState(3); // Number of quizzes to show per page

  const onPageChange = (page) => setCurrentPage(page);
  useEffect(() => {
    fetch("/api/quiz")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuizzes(data);
      });
  }, []);

  // Logic to calculate pagination
  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  return (
    <div className="m-6">
      <div className="text-2xl font-bold p-5">Select any quiz</div>
      <hr />
      <div className="card-div">
        {currentQuizzes.map((quiz, index) => (
          <Card key={index} className="quiz-card p-4">
            <a href={`/quiz/${quiz._id}`}>
              <h2 className="text-black">{quiz.quizName}</h2>
            </a>
          </Card>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(quizzes.length / quizzesPerPage)}
          onPageChange={onPageChange}
          theme="basic"
        />
      </div>
    </div>
  );
};

export default ViewQuizzes;
