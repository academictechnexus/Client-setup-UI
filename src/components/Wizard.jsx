import { useState } from "react";
import api from "../api";
import QuestionField from "./QuestionField";
import FileUpload from "./FileUpload";
import ProgressBar from "./ProgressBar";
import ClientLogin from "./ClientLogin";

export default function Wizard({ token, questions }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [setupDone, setSetupDone] = useState(false);

  const q = questions[step];

  const next = async () => {
    if (step === questions.length - 1) {
      await api.post(`/client-setup/${token}/setup`, { answers });
      setSetupDone(true);
    } else {
      setStep(step + 1);
    }
  };

  if (setupDone) {
    return <ClientLogin token={token} />;
  }

  return (
    <div className="center">
      <div className="card">
        <ProgressBar step={step} total={questions.length} />

        <h2>{q.label}</h2>
        {q.description && <p>{q.description}</p>}

        {q.type === "file" ? (
          <FileUpload token={token} />
        ) : (
          <QuestionField
            question={q}
            value={answers[q.key]}
            onChange={v =>
              setAnswers({ ...answers, [q.key]: v })
            }
          />
        )}

        <button onClick={next}>
          {step === questions.length - 1 ? "Finish Setup" : "Continue"}
        </button>
      </div>
    </div>
  );
}
