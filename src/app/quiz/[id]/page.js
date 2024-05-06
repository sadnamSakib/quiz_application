"use client";
import { useState, useEffect } from "react";
import { Label, Radio, Button, Card, Progress } from "flowbite-react";

export default function Page({ params: { id } }) {
  const [quiz, setQuiz] = useState({});
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [progressValue, setProgressValue] = useState(100);

  useEffect(() => {
    fetch(`/api/quiz/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        setQuestions(data.questions);
        setQuestionIndex(0);
        setLoading(false);
        setTimeRemaining(data.questions[0].time);
        setProgressValue(100);
      });
  }, []);

  const handleAnswerChange = (questionIndex, selectedAnswerIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedAnswerIndex,
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
      setProgressValue(
        (timeRemaining / questions[questionIndex].time) * 1.0 * 100.0
      );
    }, 1000);
    if (timeRemaining === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining]);

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    console.log(answers);
  };
  const handleNextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      setSubmitted(true);
      return;
    }
    setQuestionIndex((prevIndex) => prevIndex + 1);
    setTimeRemaining(quiz.questions[questionIndex].time);
    setProgressValue(100);
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
    setAnswers({});
    setQuestionIndex(0);
    setTimeRemaining(quiz.questions[0].time);
  };

  return (
    <div>
      {!submitted && loading && <p>Loading...</p>}
      {!submitted && !loading && (
        <div>
          <div className="m-6 p-6 relative">
            <div className="flex flex-row justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-6">{quiz.quizName}</h1>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-6">
                  Question {questionIndex + 1}/{questions.length}
                </h1>
              </div>
            </div>
            <Card>
              <div className="m-6 p-6">
                <div className="flex flex-row justify-between">
                  <h2 className="text-2xl font-bold mb-4">
                    {questionIndex + 1}. {questions[questionIndex].question}
                  </h2>
                  <p className="text-xl mb-4">
                    Time Remaining:{" "}
                    <span
                      className={`${
                        timeRemaining <= 3 ? "text-red-500 animate-flash" : ""
                      }`}
                    >
                      {timeRemaining} second{timeRemaining !== 1 ? "s" : ""}
                    </span>
                  </p>
                </div>
                <fieldset className="flex max-w-md flex-col gap-4">
                  {questions[questionIndex].answers.map(
                    (answer, answerIndex) => (
                      <div
                        key={answerIndex}
                        className="flex items-center gap-2"
                      >
                        <Radio
                          id={`${questions[questionIndex]._id}-${answerIndex}`}
                          name={`question-${questions[questionIndex]._id}`}
                          value={answer}
                          checked={
                            answers[questions[questionIndex]._id] ===
                            answerIndex
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
                          className="text-lg"
                        >
                          {answer}
                        </Label>
                      </div>
                    )
                  )}
                </fieldset>
                <div className="p-5">
                  <Progress
                    progress={progressValue}
                    progressLabelPosition="inside"
                    textLabel=""
                    textLabelPosition="outside"
                    size="lg"
                    labelText
                    color={progressValue < 20 ? "red" : "blue"}
                  />
                </div>
              </div>
            </Card>
          </div>
          <div className="flex flex-row justify-center">
            <Button onClick={handleSubmitQuiz} className="mx-auto">
              Submit Quiz
            </Button>
            <Button
              onClick={handleNextQuestion}
              className="mx-auto"
              disabled={questionIndex === questions.length - 1}
            >
              Next
            </Button>
          </div>
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
