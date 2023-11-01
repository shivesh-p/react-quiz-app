import React from "react";

export default function StartScreen({ numQuestions,dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{numQuestions} Questions to test your proficiency in React.</h3>
      <button onClick={()=> dispatch({ type: "start" })} className="btn btn-ui">Lets Go!</button>
    </div>
  );
}
