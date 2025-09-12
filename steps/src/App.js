import { useState } from "react";

const messages = ["Learn React", "Apply for jobs", "Invest your new income"];

export default function App() {
  return (
    <div>
      <Steps />
      <Steps />
    </div>
  );
}
function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  /* function closeApp() {
    if (isOpen) {
      setIsOpen(false);
    } else setIsOpen(true);
  }*/

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }
  return (
    <div>
      <button className="buttonx" onClick={() => setIsOpen((is) => !is)}>
        X
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`num ${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`num ${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`num ${step >= 3 ? "active" : ""}`}>3</div>
          </div>
          <p className="message">
            step {step}:{messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              className="buttonclass"
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              previous
            </button>
            <button
              className="buttonclass"
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
