import React from "react";
import { Label, Radio } from "flowbite-react";

const QuestionBox = ({ question, answers, correctAnswer }) => {
  return (
    <div>
      <fieldset className="flex max-w-md flex-col gap-4">
        <legend className="mb-4">{question}</legend>
        {answers.map((answer, index) => (
          <div key={index} className="flex items-center gap-4">
            <Radio
              name="answer"
              id={`answer-${index}`}
              value={answer}
              checked={correctAnswer === index}
            />
            <Label htmlFor={`answer-${index}`}>{answer}</Label>
          </div>
        ))}
      </fieldset>
    </div>
  );
};

export default QuestionBox;
