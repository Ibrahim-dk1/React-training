import { useState } from "react";
import ".//App.css";
const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

export default function App() {
  return <FlashCards />;
}

function FlashCards() {
  const [SelectedId, SetSelectedId] = useState();

  function handleClick(id) {
    SetSelectedId(id !== SelectedId ? id : null);
  }

  return (
    <div className="card-container">
      {questions.map((question) => (
        <div
          className={question.id === SelectedId ? "selected" : "Card"}
          key={question.id}
          onClick={() => handleClick(question.id)}
        >
          <p className="question">
            {question.id === SelectedId ? question.answer : question.question}
          </p>
        </div>
      ))}
    </div>
  );
}
