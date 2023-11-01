import React from "react";

export default function FinishedScreen({
  dispatch,
  points,
  totalPoints,
  highScore,
}) {
  const percentage = ((points / totalPoints) * 100).toFixed(2);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 60 && percentage < 80) emoji = "🥉";
  if (percentage >= 40 && percentage < 60) emoji = "🤔";
  else emoji = "🤦🤣🤣🤣";

  return (
    <>
      <p className="result">
        <span> {emoji}</span>
        You scored <strong>{points}</strong> out of {totalPoints}
        &nbsp;
        {percentage} %
      </p>

      <p className="highscore">HighScore: {highScore} Points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
