"use client";
import React, { useState } from "react";

import { Dropdown, Label } from "flowbite-react";

import { Button, Radio, TextInput, Card } from "flowbite-react";

export default function CreateQuiz() {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("Select Difficulty Level");
  const [quizName, setQuizName] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const handleAddQuestion = (question, answers, correctAnswer, time) => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { question, answers, correctAnswer, time },
    ]);
    setSelectedAnswerIndex(null);
  };
  const handleDifficulty = (value) => {
    return () => {
      setDifficulty(value);
    };
  };
  const handleQuizSubmit = async () => {
    if (!setQuestions.length) {
      alert("Please add questions to the quiz");
      return;
    }
    if (difficulty === "Select Difficulty Level") {
      alert("Please select a difficulty level");
      return;
    }
    if (!quizName) {
      alert("Please enter a quiz name");
      return;
    }
    if (questions.some((question) => question.correctAnswer === null)) {
      alert("Please select a correct answer for all questions");
      return;
    }
    await fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizName: quizName,
        difficulty: difficulty,
        questions: questions,
      }),
    });
    alert("Quiz added successfully");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const question = e.target.question.value;
    const answers = [
      e.target.answer1.value,
      e.target.answer2.value,
      e.target.answer3.value,
      e.target.answer4.value,
    ];
    const time = e.target.time.value;

    // Use selectedDropdownValue for the correct answer
    const correctAnswer = selectedAnswerIndex;
    if (correctAnswer === null) {
      alert("Please select the correct answer");
      return;
    }

    // Call handleAddQuestion function with the form data
    handleAddQuestion(question, answers, correctAnswer, time);

    e.target.reset();
  };

  return (
    <div className="container flex justify-center p-4">
      <div className="grid grid-cols-6 gap-4">
        <Card colSpan={3}>
          <h1 className="text-2xl font-bold mb-4 text-center">Create A Quiz</h1>
          <TextInput
            label="Quiz"
            placeholder="Enter quiz name"
            name="quizName"
            onChange={(e) => setQuizName(e.target.value)}
            required
            className="mb-4"
          />
          <Dropdown label={difficulty} className="mb-4">
            <Dropdown.Item value="Easy" onClick={handleDifficulty("Easy")}>
              Easy
            </Dropdown.Item>
            <Dropdown.Item value="Medium" onClick={handleDifficulty("Medium")}>
              Medium
            </Dropdown.Item>
            <Dropdown.Item value="Hard" onClick={handleDifficulty("Hard")}>
              Hard
            </Dropdown.Item>
          </Dropdown>
        </Card>

        <div className="col-span-3">
          <hr />

          <div className="mb-8 mt-4">
            {questions.map((question, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">
                  {index + 1 + "." + question.question} Time: {question.time}s
                </h3>
                {question.answers.map((answer, ansIndex) => (
                  <div
                    key={ansIndex}
                    className={`flex items-center space-x-4 ${
                      ansIndex === question.correctAnswer ? "bg-blue-200" : ""
                    }`}
                  >
                    <Radio
                      name={`question-${index}`}
                      id={`answer-${ansIndex}`}
                      value={answer}
                      checked={ansIndex === question.correctAnswer}
                    />
                    <Label htmlFor={`answer-${ansIndex}`}>{answer}</Label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Form to add new question */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4">
              <TextInput
                label="Question"
                placeholder="Enter a question"
                name="question"
                required
                className="mb-4"
              />
              <TextInput
                label="Time"
                placeholder="Enter time"
                name="time"
                required
                type="number"
                className="mb-4"
              />
            </div>
            <fieldset>
              {[1, 2, 3, 4].map((index) => (
                <div className="flex flex-row justify-between">
                  <TextInput
                    key={index}
                    label={`Answer ${index}`}
                    placeholder={`Enter answer ${index}`}
                    name={`answer${index}`}
                    required
                    className={`mb-2 ${
                      selectedAnswerIndex === index - 1 ? "bg-gray-200" : ""
                    }`}
                  />
                  <Radio
                    name="answer"
                    id={`answer-${index}`}
                    value={index}
                    checked={selectedAnswerIndex === index - 1}
                    onChange={() => setSelectedAnswerIndex(index - 1)}
                  />
                </div>
              ))}
            </fieldset>
            <Button type="submit" className="mt-4">
              Add Question
            </Button>
          </form>
          <Button className="mt-4" onClick={handleQuizSubmit}>
            Submit Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
