"use client";
import { useState, useEffect } from "react";
import { Label, Radio, Button } from "flowbite-react";

export default function Page({ params: { id } }) {
  const [quiz, setQuiz] = useState({});
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const [questionTimers, setQuestionTimers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    fetch(`/api/quiz/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        setQuestions(data.questions);
        setQuestionIndex(0);
        setLoading(false);
        setTimeRemaining(data.questions[0].time);
      });
  }, []);

  const handleAnswerChange = (questionIndex, selectedAnswerIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedAnswerIndex,
    }));
  };

  const startQuiz = () => {
    setStarted(true);
    const initialTimers = quiz.questions.map(() => quiz.timePerQuestion || 60);
    setQuestionTimers(initialTimers);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);
    if (timeRemaining === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining]);

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    console.log(answers);
    // Optionally, you can submit the quiz answers to the server here
  };
  const handleNextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      setSubmitted(true);
      return;
    }
    setQuestionIndex((prevIndex) => prevIndex + 1);
    setTimeRemaining(quiz.questions[questionIndex].time);
  };
  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.correctAnswer === answers[question._id]) {
        score += 1;
      }
    });
    return score;
  };
  const handleRetryQuiz = () => {
    setSubmitted(false);
    setStarted(false);
    setAnswers({});
    setQuestionIndex(0);
    setTimeRemaining(quiz.questions[0].time);
    setTotalScore(0);
    startQuiz();
  };

  return (
    <div>
      {!submitted && loading && <p>Loading...</p>}
      {!started && !loading && (
        <div className="m-6 p-6">
          <h1>{quiz.quizName}</h1>
          <h2>{quiz.questions.length} Questions</h2>
          <Button onClick={startQuiz}>Start Quiz</Button>
        </div>
      )}
      {!submitted && !loading && questionTimers.length > 0 && (
        <div className="m-6 p-6">
          <div>
            {questionIndex + 1}/{questions.length}
          </div>
          <h1>{quiz.quizName}</h1>
          <div className="m-6 p-6">
            <h2>
              {questionIndex + 1}. {questions[questionIndex].question}
            </h2>
            <p>Time Remaining: {timeRemaining}</p>
            <fieldset className="flex max-w-md flex-col gap-4">
              {questions[questionIndex].answers.map((answer, answerIndex) => (
                <div key={answerIndex} className="flex items-center gap-2">
                  <Radio
                    id={`${questions[questionIndex]._id}-${answerIndex}`}
                    name={`question-${questions[questionIndex]._id}`}
                    value={answer}
                    checked={
                      answers[questions[questionIndex]._id] === answerIndex
                    }
                    onChange={() =>
                      handleAnswerChange(
                        questions[questionIndex]._id,
                        answerIndex
                      )
                    }
                    disabled={submitted}
                  />
                  <Label
                    htmlFor={`${questions[questionIndex]._id}-${answerIndex}`}
                  >
                    {answer}
                  </Label>
                </div>
              ))}
            </fieldset>
          </div>
          <Button
            className="mb-4"
            onClick={handleNextQuestion}
            disabled={submitted || questionIndex === questions.length - 1}
          >
            Next Question{" "}
          </Button>
          <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
        </div>
      )}
      {submitted && (
        <div className="m-6 p-6">
          <h2>
            Your score is:{" "}
            <span className="text-2xl font-bold">{calculateScore()}</span>
          </h2>
          <hr />
          <Button className="mt-6" onClick={handleRetryQuiz}>
            Retry Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
