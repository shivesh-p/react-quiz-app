import React from "react";
import Options from "./Options";

export default function Question({ question, answer, dispatch }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        dispatch={dispatch}
        answer={answer}
        correctAnswer={question.correctOption}
        options={question.options}
      ></Options>
    </div>
  );
}
