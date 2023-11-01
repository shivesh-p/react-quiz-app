import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  //loading, error,ready,active,finished states in the application can be in
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "newAnswer":
      const currentQuestion = state.questions[state.index];
      const points = currentQuestion.points;
      const currentAnswer = action.payload;
      const isCorrectAnswer = currentAnswer === currentQuestion.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: isCorrectAnswer ? state.points + points : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        highScore: state.highScore,
        questions: state.questions,
      };
    default:
      throw new Error("Dispatched Unknown Action.");
  }
}

export default function App() {
  const [
    { secondsRemaining, questions, status, index, answer, points, highScore },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.points;
  }, 0);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong on api server!");
        }
      })
      .then((data) => {
        //console.debug(data);
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "dataFailed" });
        console.error(error);
      });
    return () => {};
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              answer={answer}
              totalPoints={totalPoints}
              points={points}
              index={index}
              numQuestions={numQuestions}
            ></Progress>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            ></Question>
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              ></Timer>
              <NextButton
                index={index}
                numQuestions={numQuestions}
                dispatch={dispatch}
                answer={answer}
              ></NextButton>
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishedScreen
            dispatch={dispatch}
            highScore={highScore}
            points={points}
            totalPoints={totalPoints}
          ></FinishedScreen>
        )}
      </Main>
    </div>
  );
}
