import React from "react";

function Error() {
  return (
    <p className="error">
      <span role="img" aria-label="sparkle">
        💥
      </span>{" "}
      There was an error fecthing questions.
    </p>
  );
}

export default Error;
