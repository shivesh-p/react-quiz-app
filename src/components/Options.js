import React from "react";

export default function Options({ options, dispatch, answer, correctAnswer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {options.map((option, index) => {
        return (
          <button
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            key={option}
            className={`${answer === index ? "answer" : ""}
             ${
               hasAnswered
                 ? index === correctAnswer
                   ? "correct"
                   : "wrong"
                 : ""
             }  btn btn-option`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
