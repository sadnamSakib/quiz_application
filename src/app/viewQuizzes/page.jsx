"use client";
import React, { useEffect, useState } from "react";
import { Card, Pagination, Button } from "flowbite-react";

const ViewQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quizzesPerPage] = useState(4);

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
    <div className="m-4">
      <div className="text-2xl font-bold p-5 text-center">Select any quiz</div>
      <hr />
      <div className="card-div">
        {currentQuizzes.map((quiz, index) => (
          <Card key={index} className="quiz-card p-2 max-w-lg">
            <h2 className="text-2xl font-bold">{quiz.quizName}</h2>
            <p>Difficulty: {quiz.difficulty}</p>
            <p>Total Questions: {quiz.questions.length}</p>
            <a href={`/quiz/${quiz._id}`}>
              <Button className="btn">Start Quiz</Button>
            </a>
          </Card>
        ))}
      </div>
      <hr />
      <div className="flex justify-center mt-4 mb-5">
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
