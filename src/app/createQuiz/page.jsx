"use client";
import React, { useState } from "react";

import { Dropdown, Label, Radio } from "flowbite-react";

import { Button, Checkbox, TextInput } from "flowbite-react";

export default function CreateQuiz() {
  const [questions, setQuestions] = useState([]);
  const [quizName, setQuizName] = useState("");
  const handleAddQuestion = (question, answers, correctAnswer, time) => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { question, answers, correctAnswer, time },
    ]);
  };
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(null);
  const handleQuizSubmit = async () => {
    await fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizName: quizName,
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
    const correctAnswer = selectedDropdownValue;

    // Call handleAddQuestion function with the form data
    handleAddQuestion(question, answers, correctAnswer, time);

    e.target.reset();
  };
  const handleSelect = (value) => {
    return () => {
      setSelectedDropdownValue(value);
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      <TextInput
        label="Quiz"
        placeholder="Enter quiz name"
        name="quizName"
        onChange={(e) => setQuizName(e.target.value)}
        required
        className="mb-4"
      />
      <hr />
      {/* Render existing questions */}
      <div className="mb-8 mt-4">
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold">
              {index + 1 + "." + question.question} Time: {question.time}s
            </h3>
            {question.answers.map((answer, ansIndex) => (
              <div key={ansIndex} className="flex items-center space-x-4">
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
          className="mb-4"
        />
        {[1, 2, 3, 4].map((index) => (
          <TextInput
            key={index}
            label={`Answer ${index}`}
            placeholder={`Enter answer ${index}`}
            name={`answer${index}`}
            required
            className={`mb-2 ${
              selectedDropdownValue === index - 1 ? "bg-gray-200" : ""
            }`}
          />
        ))}
        <Dropdown label="Select Correct Answer" className="mb-4">
          {[1, 2, 3, 4].map((index) => (
            <Dropdown.Item
              key={index}
              value={index.toString()}
              onClick={handleSelect(index - 1)}
            >
              {index}
            </Dropdown.Item>
          ))}
        </Dropdown>
        <Button type="submit" className="mt-4">
          Add Question
        </Button>
      </form>
      <Button className="mt-4" onClick={handleQuizSubmit}>
        Submit Quiz
      </Button>
    </div>
  );
}
